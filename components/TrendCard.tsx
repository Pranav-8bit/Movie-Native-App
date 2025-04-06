import { View, Text, Image, TouchableOpacity } from "react-native";
import MaskedView from "@react-native-masked-view/masked-view";
import React from "react";
import { Link } from "expo-router";
import { images } from "@/constants/images";

const TrendCard = ({
  movie: { movie_id, title, post_url },
  index,
}: TrendingCardProps) => {
  return (
    <Link href={`/movies/${movie_id}`} asChild>
      <TouchableOpacity className="w-32 relative pl-5">
        <Image
          source={{ uri: post_url }}
          className="w-32 h-48 rounded-lg"
          resizeMode="cover"
        />
        <View className="absolute bottom-9 -left-3.5 px-2 py-1 rounded-full">
          <MaskedView
            maskElement={
              <Text className="text-white text-6xl font-bold">
                {index + 1}{" "}
              </Text>
            }>
            <Image
              source={images.rankingGradient}
              className="size-14"
              resizeMode="cover"></Image>
          </MaskedView>
        </View>
        <Text
          className="text-sm text-light-200 font-bold mt-2"
          numberOfLines={2}>
          {title}
        </Text>
      </TouchableOpacity>
    </Link>
  );
};

export default TrendCard;
