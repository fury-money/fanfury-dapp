import React from "react";
import {
  Image,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";

import heart from "../../../../assets/icons/heart.svg";
import behanceIcon from "../../../../assets/icons/social-network/behance-grey.svg";
import dribbleIcon from "../../../../assets/icons/social-network/dribble-grey.svg";
import facebookIcon from "../../../../assets/icons/social-network/facebook-grey.svg";
import githubIcon from "../../../../assets/icons/social-network/github-grey.svg";
import googleIcon from "../../../../assets/icons/social-network/google-grey.svg";
import twitterIcon from "../../../../assets/icons/social-network/twitter-grey.svg";
import youtubeIcon from "../../../../assets/icons/social-network/youtube-grey.svg";
import { BrandText } from "../../../components/BrandText";
import { SVG } from "../../../components/SVG";
import { Separator } from "../../../components/Separator";
import { TertiaryBox } from "../../../components/boxes/TertiaryBox";
import { SecondaryButton } from "../../../components/buttons/SecondaryButton";
import { DisplayMoreServices } from "../../../components/freelanceServices/LogoDesign/LogoDesignDetails/DisplayMoreServices";
import { DisplayReviews } from "../../../components/freelanceServices/LogoDesign/LogoDesignDetails/DisplayReviews";
import { ReviewsStats } from "../../../components/freelanceServices/LogoDesign/LogoDesignDetails/ReviewsStats";
import { StarRating } from "../../../components/freelanceServices/common/StarRating";
import { ScreenFC } from "../../../utils/navigation";
import {
  errorColor,
  neutral00,
  neutral17,
  neutral44,
  neutral67,
  neutral77,
  neutralA3,
  secondaryColor,
  successColor,
  yellowDefault,
} from "../../../utils/style/colors";
import {
  fontMedium14,
  fontSemibold14,
  fontSemibold16,
  fontSemibold20,
} from "../../../utils/style/fonts";
import { leftMarginMainContent } from "../../../utils/style/layout";
import { FreelanceServicesScreenWrapper } from "../FreelanceServicesScreenWrapper";
import { getService, getUser } from "../query/data";

export const SellerDetailsScreen: ScreenFC<"SellerDetails"> = ({
  route: {
    params: { id },
  },
}) => {
  const user = getUser(id);
  const data = getService(id);
  const { width } = useWindowDimensions();

  return (
    <FreelanceServicesScreenWrapper>
      <View
        style={{
          flexDirection: width > 1280 ? "row" : "column",
          maxWidth: 1440,
          width: "100%",
          alignSelf: "center",
          paddingHorizontal: leftMarginMainContent,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            width: width > 1280 ? "40%" : "100%",
            minWidth: 330,
            justifyContent: "space-between",
          }}
        >
          <View style={{ width: "100%", marginTop: 24 }}>
            <TertiaryBox fullWidth>
              <View
                style={{
                  width: "90%",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignSelf: "center",
                    alignItems: "center",
                    flex: 1,
                    justifyContent: "space-between",
                    width: "100%",
                    marginTop: 16,
                    marginBottom: 8,
                  }}
                >
                  <SVG
                    source={heart}
                    width={24}
                    height={24}
                    style={{ marginRight: 80 }}
                    fill={user.isFavorite ? "red" : "none"}
                  />
                  <Image
                    source={user.profilePic}
                    style={{ width: 104, height: 104 }}
                  />
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
                          backgroundColor:
                            user.onlineStatus === "online"
                              ? successColor
                              : errorColor,
                          width: 6,
                          height: 6,
                          borderRadius: 24,
                        }}
                      />
                      <BrandText
                        style={[
                          fontSemibold16,
                          {
                            color:
                              user.onlineStatus === "online"
                                ? successColor
                                : errorColor,
                            marginLeft: 4,
                          },
                        ]}
                      >
                        {" "}
                        {user.onlineStatus}
                      </BrandText>
                    </View>
                  </View>
                </View>
                <BrandText style={fontSemibold20}>{user.username}</BrandText>
                <BrandText
                  style={[
                    { color: neutralA3, marginTop: 8, marginBottom: 8 },
                    fontSemibold14,
                  ]}
                >
                  {user.tagline}
                </BrandText>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginRight: 12,
                  }}
                >
                  <StarRating rating={user.rating} />
                  <BrandText
                    style={[
                      { color: yellowDefault, marginRight: 12 },
                      fontMedium14,
                    ]}
                  >
                    {user.rating}
                  </BrandText>
                  <BrandText style={[{ color: neutral77 }, fontMedium14]}>
                    ({user.totalReviews})
                  </BrandText>
                </View>
                <Separator
                  style={{ width: "100%", marginTop: 12, marginBottom: 12 }}
                />
                <SecondaryButton
                  fullWidth
                  size="SM"
                  text="Contact Me"
                  backgroundColor={secondaryColor}
                  color={neutral00}
                />
                <Separator style={{ width: "100%", marginTop: 12 }} />

                <View style={{ flexDirection: "row", marginTop: 24 }}>
                  <View style={{ flexDirection: "column", width: 195 }}>
                    <BrandText
                      style={[
                        fontSemibold14,
                        { color: neutral77, marginBottom: 8 },
                      ]}
                    >
                      From
                    </BrandText>
                    <BrandText style={fontSemibold14}>
                      {user.country.name}
                    </BrandText>
                  </View>
                  <View style={{ flexDirection: "column", width: 160 }}>
                    <BrandText
                      style={[
                        fontSemibold14,
                        { color: neutral77, marginBottom: 8 },
                      ]}
                    >
                      Member Since
                    </BrandText>
                    <BrandText style={fontSemibold14}>
                      {user.createDate.toLocaleDateString()}
                    </BrandText>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    marginTop: 8,
                    marginBottom: 16,
                  }}
                >
                  <View style={{ flexDirection: "column", width: 195 }}>
                    <BrandText
                      style={[
                        fontSemibold14,
                        { color: neutral77, marginBottom: 8 },
                      ]}
                    >
                      Avg. response time
                    </BrandText>
                    <BrandText style={fontSemibold14}>
                      {user.times.avgResponseTime}
                    </BrandText>
                  </View>
                  <View style={{ flexDirection: "column", width: 160 }}>
                    <BrandText
                      style={[
                        fontSemibold14,
                        { color: neutral77, marginBottom: 8 },
                      ]}
                    >
                      Last delivery
                    </BrandText>
                    <BrandText style={fontSemibold14}>
                      {user.times.lastDelivery}
                    </BrandText>
                  </View>
                </View>
              </View>
            </TertiaryBox>

            <View
              style={{
                marginTop: 20,
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
              <TertiaryBox width={191} height={191} />
              <TertiaryBox width={191} height={191} />
            </View>

            <Separator
              style={{ width: "100%", marginTop: 20, marginBottom: 20 }}
            />

            <BrandText style={fontSemibold20}>Description</BrandText>
            <BrandText
              style={[fontSemibold16, { color: neutral77, marginTop: 12 }]}
            >
              {user.intro}
            </BrandText>

            <Separator
              style={{ width: "100%", marginTop: 20, marginBottom: 20 }}
            />

            <BrandText style={fontSemibold20}>Languages</BrandText>
            {user.languages.map((item, index) => (
              <BrandText
                key={index}
                style={[fontSemibold16, { color: neutral77, marginTop: 16 }]}
              >
                {item.title} - {item.description}
              </BrandText>
            ))}

            <Separator
              style={{ width: "100%", marginTop: 20, marginBottom: 20 }}
            />

            <BrandText style={fontSemibold20}>Linked Accounts</BrandText>
            <TouchableOpacity>
              <View
                style={{
                  flexDirection: "row",
                  alignContent: "center",
                  marginTop: 16,
                }}
              >
                <SVG
                  source={twitterIcon}
                  width={16}
                  height={16}
                  style={{ marginTop: 2 }}
                />
                <BrandText
                  style={[
                    fontSemibold16,
                    { marginLeft: 12, color: neutralA3, marginBottom: 12 },
                  ]}
                >
                  Twitter
                </BrandText>
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View style={{ flexDirection: "row", alignContent: "center" }}>
                <SVG
                  source={behanceIcon}
                  width={16}
                  height={16}
                  style={{ marginTop: 2 }}
                />
                <BrandText
                  style={[
                    fontSemibold16,
                    { marginLeft: 12, color: neutralA3, marginBottom: 12 },
                  ]}
                >
                  Behance
                </BrandText>
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View style={{ flexDirection: "row", alignContent: "center" }}>
                <SVG
                  source={dribbleIcon}
                  width={16}
                  height={16}
                  style={{ marginTop: 2 }}
                />
                <BrandText
                  style={[
                    fontSemibold16,
                    { marginLeft: 12, color: neutralA3, marginBottom: 12 },
                  ]}
                >
                  Dribble
                </BrandText>
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View style={{ flexDirection: "row", alignContent: "center" }}>
                <SVG
                  source={facebookIcon}
                  width={16}
                  height={16}
                  style={{ marginTop: 2 }}
                />
                <BrandText
                  style={[
                    fontSemibold16,
                    { marginLeft: 12, color: neutralA3, marginBottom: 12 },
                  ]}
                >
                  Facebook
                </BrandText>
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View style={{ flexDirection: "row", alignContent: "center" }}>
                <SVG
                  source={githubIcon}
                  width={16}
                  height={16}
                  style={{ marginTop: 2 }}
                />
                <BrandText
                  style={[
                    fontSemibold16,
                    { marginLeft: 12, color: neutralA3, marginBottom: 12 },
                  ]}
                >
                  Github
                </BrandText>
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View style={{ flexDirection: "row", alignContent: "center" }}>
                <SVG
                  source={googleIcon}
                  width={16}
                  height={16}
                  style={{ marginTop: 2 }}
                />
                <BrandText
                  style={[
                    fontSemibold16,
                    { marginLeft: 12, color: neutralA3, marginBottom: 12 },
                  ]}
                >
                  Google
                </BrandText>
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View style={{ flexDirection: "row", alignContent: "center" }}>
                <SVG
                  source={youtubeIcon}
                  width={16}
                  height={16}
                  style={{ marginTop: 2 }}
                />
                <BrandText
                  style={[
                    fontSemibold16,
                    { marginLeft: 12, color: neutralA3, marginBottom: 12 },
                  ]}
                >
                  Youtube
                </BrandText>
              </View>
            </TouchableOpacity>

            <Separator
              style={{ width: "100%", marginTop: 20, marginBottom: 20 }}
            />

            <BrandText style={fontSemibold20}>Skills</BrandText>

            <View
              style={{
                flexDirection: "row",
                width: "100%",
                flexWrap: "wrap",
                marginTop: 16,
              }}
            >
              {user.skills.map((skill, index) => (
                <View
                  key={index}
                  style={{
                    marginRight: 12,
                    marginBottom: 12,
                    backgroundColor: neutral17,
                    borderRadius: 8,
                    borderColor: neutral44,
                    borderWidth: 0.5,
                  }}
                >
                  <BrandText style={[fontMedium14, { margin: 12 }]}>
                    {skill}
                  </BrandText>
                </View>
              ))}
            </View>

            <Separator
              style={{ width: "100%", marginTop: 20, marginBottom: 20 }}
            />

            <BrandText style={[fontSemibold20, { marginBottom: 16 }]}>
              Education
            </BrandText>

            {user.education.map((education, index) => (
              <View
                style={{ flexDirection: "column", marginBottom: 8 }}
                key={index}
              >
                <BrandText style={[fontSemibold16, { color: neutral77 }]}>
                  {education.title}
                </BrandText>
                <BrandText
                  style={[fontSemibold14, { color: neutral67, marginTop: 8 }]}
                >
                  {education.description}
                </BrandText>
              </View>
            ))}

            <Separator
              style={{ width: "100%", marginTop: 20, marginBottom: 20 }}
            />

            <BrandText style={[fontSemibold20, { marginBottom: 16 }]}>
              Certifications
            </BrandText>

            {user.certifications.map((certs, index) => (
              <View
                style={{ flexDirection: "column", marginBottom: 12 }}
                key={index}
              >
                <BrandText style={[fontSemibold16, { color: neutral77 }]}>
                  {certs.title}
                </BrandText>
                <BrandText
                  style={[fontMedium14, { color: neutral67, marginTop: 8 }]}
                >
                  {certs.description}
                </BrandText>
              </View>
            ))}
          </View>

          {/*Need to have the notion of Services provided in general ?*/}
          {/*<SecondaryCard />*/}
        </View>
        <View
          style={{
            width: width > 1280 ? "60%" : "100%",
            paddingLeft: width > 1280 ? 60 : 0,
            // paddingHorizontal: width > 1280 ? 30 : 0,
          }}
        >
          <DisplayMoreServices />
          {data.reviews ? <ReviewsStats reviews={data.reviews} /> : <></>}
          {data.reviews?.items ? (
            <DisplayReviews reviews={data.reviews.items} />
          ) : (
            <></>
          )}
        </View>
      </View>
    </FreelanceServicesScreenWrapper>
  );
};