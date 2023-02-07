import React from "react";
import { Image, ImageBackground, TouchableOpacity, View } from "react-native";

import backgroundPic from "../../../../assets/banners/freelance-service/background-pic.png";
import profilePic from "../../../../assets/banners/freelance-service/profile-pic.png";
import chevronUp from "../../../../assets/icons/chevron-up.svg";
import chevronDown from "../../../../assets/icons/freelance-service/chevron-down.svg";
import { BrandText } from "../../../components/BrandText";
import { SVG } from "../../../components/SVG";
import { ScreenContainer } from "../../../components/ScreenContainer";
import { Separator } from "../../../components/Separator";
import { TertiaryBox } from "../../../components/boxes/TertiaryBox";
import { SecondaryButton } from "../../../components/buttons/SecondaryButton";
import { ReviewCard } from "../../../components/freelanceServices/Cards/ReviewCard";
import { DisplayMoreServices } from "../../../components/freelanceServices/LogoDesign/LogoDesignDetails/DisplayMoreServices";
import { DisplayReviews } from "../../../components/freelanceServices/LogoDesign/LogoDesignDetails/DisplayReviews";
import { LogoDesignDetailsHeader } from "../../../components/freelanceServices/LogoDesign/LogoDesignDetails/LogoDesignDetailsHeader";
import { LogoDesignDetailsTab } from "../../../components/freelanceServices/LogoDesign/LogoDesignDetails/LogoDesignDetailsTab";
import { RelatedTags } from "../../../components/freelanceServices/LogoDesign/LogoDesignDetails/RelatedTags";
import { ReviewsStats } from "../../../components/freelanceServices/LogoDesign/LogoDesignDetails/ReviewsStats";
import { SecondaryCard } from "../../../components/freelanceServices/LogoDesign/LogoDesignDetails/SecondaryCard";
import { StarRating } from "../../../components/freelanceServices/StarRating";
import { ScreenFC } from "../../../utils/navigation";
import {
  neutral00,
  neutral33,
  neutral44,
  neutral77,
  neutralA3,
  successColor,
  yellowDefault,
} from "../../../utils/style/colors";
import {
  fontMedium14,
  fontSemibold14,
  fontSemibold16,
  fontSemibold20,
  fontSemibold28,
} from "../../../utils/style/fonts";
import { getService } from "../query/data";
import { OrdersInQueue } from "./OrdersInQueue";
import { TopRatedSeller } from "./TopRatedSeller";

export const LogoDesignDetailsScreen: ScreenFC<"LogoDesignDetails"> = ({
  route: {
    params: { id },
  },
}) => {
  const data = getService(id);

  return (
    <ScreenContainer>
      <View
        style={{ flexDirection: "column", width: 1280, alignSelf: "center" }}
      >
        <LogoDesignDetailsHeader data={data} />

        <View
          style={{
            flexDirection: "row",
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <View style={{ width: 750, marginTop: 24 }}>
            <BrandText style={fontSemibold28}>{data.title}</BrandText>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 12,
              }}
            >
              <Image
                source={data.user.profilePic}
                style={{ width: 32, height: 32, marginRight: 12 }}
              />
              <BrandText style={[fontMedium14, { marginRight: 12 }]}>
                @{data.user.username}
              </BrandText>
              <TopRatedSeller rating={data.user.rating} />
              <View
                style={{
                  width: 24,
                  borderColor: neutral33,
                  borderWidth: 0.5,
                  transform: [{ rotate: "90deg" }],
                }}
              />
              <StarRating rating={data.user.rating} />
              <BrandText
                style={[
                  { color: yellowDefault, marginRight: 12 },
                  fontMedium14,
                ]}
              >
                {data.user.rating}
              </BrandText>
              <BrandText style={[{ color: neutral77 }, fontMedium14]}>
                ({data.user.totalReviews})
              </BrandText>
              {data.user.totalQueue > 0 ? (
                <View
                  style={{
                    width: 24,
                    borderColor: neutral33,
                    borderWidth: 0.5,
                    transform: [{ rotate: "90deg" }],
                  }}
                />
              ) : null}
              <OrdersInQueue totalQueue={data.user.totalQueue} />
            </View>
            <Separator
              style={{ width: "100%", marginTop: 20, marginBottom: 16 }}
            />
            <TertiaryBox width={626} height={626}>
              <ImageBackground
                source={backgroundPic}
                style={{ width: "100%", height: "100%" }}
              >
                <View
                  style={{
                    justifyContent: "center",
                    width: "100%",
                    height: "100%",
                    alignItems: "flex-end",
                  }}
                >
                  <TouchableOpacity>
                    <View
                      style={{
                        width: 48,
                        height: 48,
                        backgroundColor: neutral00,
                        borderColor: neutral33,
                        borderWidth: 0.5,
                        borderRadius: 24,
                        alignItems: "center",
                        justifyContent: "center",
                        marginBottom: 12,
                        marginRight: 16,
                      }}
                    >
                      <SVG
                        source={chevronUp}
                        width={16}
                        height={16}
                        style={{}}
                      />
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <View
                      style={{
                        width: 48,
                        height: 48,
                        backgroundColor: neutral00,
                        borderColor: neutral33,
                        borderWidth: 0.5,
                        borderRadius: 24,
                        alignItems: "center",
                        justifyContent: "center",
                        marginRight: 16,
                      }}
                    >
                      <SVG source={chevronDown} width={16} height={16} />
                    </View>
                  </TouchableOpacity>
                </View>
              </ImageBackground>
            </TertiaryBox>
            {data.reviews?.items ? (
              <View
                style={{
                  width: "100%",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: 40,
                  alignItems: "center",
                }}
              >
                <BrandText style={fontSemibold20}>
                  What people loved about the seller
                </BrandText>

                <SecondaryButton size="SM" text="See all reviews" />
              </View>
            ) : (
              <></>
            )}

            {data.reviews?.items ? (
              <ReviewCard reviews={data.reviews.items} />
            ) : (
              <></>
            )}

            <View nativeID="about" style={{ marginTop: 40, width: "100%" }}>
              <BrandText style={fontSemibold20}>About This Gig</BrandText>
              <BrandText
                style={[
                  fontSemibold16,
                  { marginTop: 12, marginBottom: 12, color: neutral77 },
                ]}
              >
                {data.description}
              </BrandText>
            </View>

            <Separator
              style={{ width: "100%", marginTop: 20, marginBottom: 20 }}
            />

            <View style={{ flexDirection: "row" }}>
              <View style={{ flexDirection: "column", width: 200 }}>
                <BrandText
                  style={[
                    fontSemibold14,
                    { color: neutral77, marginBottom: 8 },
                  ]}
                >
                  Logo Style
                </BrandText>

                <BrandText style={fontSemibold14}>Minimalist</BrandText>
              </View>
              <View style={{ flexDirection: "column", width: 500 }}>
                <BrandText
                  style={[
                    fontSemibold14,
                    { color: neutral77, marginBottom: 8 },
                  ]}
                >
                  File Format
                </BrandText>

                <BrandText style={fontSemibold14}>
                  AI, JPG, PDF, PNG, PSD, EPS, SVG
                </BrandText>
              </View>
            </View>

            <View style={{ marginTop: 40 }}>
              <BrandText style={[fontSemibold20, { marginBottom: 16 }]}>
                About the Seller
              </BrandText>
              <View
                style={{
                  flexDirection: "row",
                  width: "100%",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <View style={{ flexDirection: "row" }}>
                  <Image
                    source={profilePic}
                    style={{ width: 104, height: 104 }}
                  />
                  <View
                    style={{
                      flexDirection: "column",
                      justifyContent: "space-around",
                      marginLeft: 12,
                    }}
                  >
                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      <BrandText style={fontSemibold16}>username</BrandText>
                      <View
                        style={{
                          width: "fit-content",
                          height: "fit-content",
                          backgroundColor: neutral00,
                          borderColor: neutral44,
                          borderWidth: 0.5,
                          borderRadius: 24,
                          alignItems: "center",
                          justifyContent: "center",
                          marginLeft: 12,
                        }}
                      >
                        <View
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                            paddingRight: 16,
                            paddingBottom: 8,
                            paddingLeft: 16,
                            paddingTop: 8,
                          }}
                        >
                          <View
                            style={{
                              backgroundColor: successColor,
                              width: 6,
                              height: 6,
                              borderRadius: 24,
                            }}
                          />
                          <BrandText
                            style={[
                              fontSemibold16,
                              { color: successColor, marginLeft: 4 },
                            ]}
                          >
                            {" "}
                            {data.user.onlineStatus}
                          </BrandText>
                        </View>
                      </View>
                    </View>
                    <BrandText style={[fontMedium14, { color: neutralA3 }]}>
                      {data.user.tagline}
                    </BrandText>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginRight: 12,
                      }}
                    >
                      <StarRating rating={data.user.rating} />

                      <BrandText
                        style={[
                          { color: yellowDefault, marginRight: 12 },
                          fontMedium14,
                        ]}
                      >
                        {data.user.rating}
                      </BrandText>
                      <BrandText style={[{ color: neutral77 }, fontMedium14]}>
                        ({data.user.totalReviews})
                      </BrandText>
                    </View>
                  </View>
                </View>
                <SecondaryButton size="SM" text="Contact Me" />
              </View>

              <View style={{ flexDirection: "row", marginTop: 24 }}>
                <View style={{ flexDirection: "column", width: 200 }}>
                  <BrandText
                    style={[
                      fontSemibold14,
                      { color: neutral77, marginBottom: 8 },
                    ]}
                  >
                    From
                  </BrandText>
                  <BrandText style={fontSemibold14}>
                    {data.user.country}
                  </BrandText>
                </View>
                <View style={{ flexDirection: "column", width: 500 }}>
                  <BrandText
                    style={[
                      fontSemibold14,
                      { color: neutral77, marginBottom: 8 },
                    ]}
                  >
                    Member Since
                  </BrandText>
                  <BrandText style={fontSemibold14}>
                    {`${data.user.createDate.toLocaleDateString()}`}
                  </BrandText>
                </View>
              </View>
              <View style={{ flexDirection: "row", marginTop: 8 }}>
                <View style={{ flexDirection: "column", width: 200 }}>
                  <BrandText
                    style={[
                      fontSemibold14,
                      { color: neutral77, marginBottom: 8 },
                    ]}
                  >
                    Avg. response time
                  </BrandText>
                  <BrandText style={fontSemibold14}>2 hours</BrandText>
                </View>
                <View style={{ flexDirection: "column", width: 500 }}>
                  <BrandText
                    style={[
                      fontSemibold14,
                      { color: neutral77, marginBottom: 8 },
                    ]}
                  >
                    Last delivery
                  </BrandText>
                  <BrandText style={fontSemibold14}>about 11 minutes</BrandText>
                </View>
              </View>
            </View>

            <Separator
              style={{ width: "100%", marginTop: 20, marginBottom: 20 }}
            />

            <BrandText
              style={[fontSemibold16, { color: neutral77, width: "100%" }]}
            >
              {data.user.levelText}
            </BrandText>

            <View
              style={{
                marginTop: 60,
                flexDirection: "row",
                width: "100%",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <BrandText style={fontSemibold20}>My Portfolio</BrandText>
              <SecondaryButton size="SM" text="See Project (7)" />
            </View>
            <View
              style={{
                width: "100%",
                justifyContent: "space-between",
                flexDirection: "row",
                marginTop: 20,
              }}
            >
              <TertiaryBox width={236} height={236} />
              <TertiaryBox width={236} height={236} />
              <TertiaryBox width={236} height={236} />
            </View>

            <BrandText
              style={[fontSemibold20, { marginTop: 30, marginBottom: 20 }]}
            >
              Compare Package
            </BrandText>

            <LogoDesignDetailsTab />

            {data.reviews ? <ReviewsStats reviews={data.reviews} /> : <></>}
            {data.reviews?.items ? (
              <DisplayReviews reviews={data.reviews.items} />
            ) : (
              <></>
            )}

            {data.tags ? <RelatedTags tags={data.tags} /> : <></>}

            <DisplayMoreServices />
          </View>

          {data.serviceLevels ? (
            <SecondaryCard data={data.serviceLevels} />
          ) : null}
        </View>
      </View>
    </ScreenContainer>
  );
};