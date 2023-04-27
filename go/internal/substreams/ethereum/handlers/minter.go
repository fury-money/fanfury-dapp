package handlers

import (
	"encoding/hex"
	"fmt"

	"github.com/TERITORI/teritori-dapp/go/internal/indexerdb"
	"github.com/TERITORI/teritori-dapp/go/internal/substreams/ethereum/abi_go"
	"github.com/TERITORI/teritori-dapp/go/internal/substreams/pb"
	"github.com/davecgh/go-spew/spew"
	"github.com/ethereum/go-ethereum/accounts/abi"
	"github.com/pkg/errors"
	"go.uber.org/zap"
)

type MinterMintWithMetadataInput struct {
	MintData []abi_go.TeritoriMinterMintDataWithMetadata `json:"mintData"`
}

type MetaData struct {
	Attributes indexerdb.ArrayJSONB `json:"attributes"`
}

func (h *Handler) HandleMintWithMetadata(method *abi.Method, tx *pb.Tx, args map[string]interface{}) error {
	var data MinterMintWithMetadataInput
	if err := ArgsToStruct(args, &data); err != nil {
		return errors.Wrap(err, "failed to decode data")
	}

	for idx, nftData := range data.MintData {
		// We get owner (user who request mint) from the tx logs
		txLog := tx.Receipt.Logs[idx]
		encodedString := hex.EncodeToString(txLog.Topics[2])
		owner := fmt.Sprintf("0x%s", encodedString[24:])
		ownerID := h.Network.UserID(owner)

		tokenID := nftData.TokenId.String()
		nftID := h.Network.NFTID(tx.Call.Address, tokenID)
		collectionID := h.Network.CollectionID(tx.Call.Address)

		// Get attributes from URI
		var metaData MetaData
		if err := FetchIPFSJSON(nftData.TokenUri, &metaData); err != nil {
			h.Logger.Error("failed to fetch nft metadata", zap.String("metadata-uri", nftData.TokenUri), zap.Error(err))
		}

		nft := indexerdb.NFT{
			ID:           nftID,
			OwnerID:      ownerID,
			Name:         nftData.Extension.Name,
			ImageURI:     nftData.Extension.Image,
			CollectionID: collectionID,
			Attributes:   metaData.Attributes,
			TeritoriNFT: &indexerdb.TeritoriNFT{
				TokenID: tokenID,
			},
		}

		if err := h.IndexerDB.Create(&nft).Error; err != nil {
			spew.Dump(nft)
			return errors.Wrap(err, "failed to create nft in db")
		}
	}

	return nil
}