import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  Text,
  View,
} from "react-native";
import { Link, router } from "expo-router";
import { images } from "@/constants/images";
import { icons } from "@/constants/icons";
import Searchbar from "@/components/searchbar";
import { useRouter } from "expo-router";
import useFetch from "@/services/useFetch";
import { fetchMovies } from "@/services/api";
import MovieCard from "@/components/MovieCard";
import { trendingMovies } from "@/services/appwrite";
import TrendCard from "@/components/TrendCard";

export default function Index() {
  const router = useRouter();

  const {
    data: trendMovies,
    loading: trendLoading,
    error: trendError,
  } = useFetch(() => trendingMovies());

  const {
    data: movies,
    loading: movieLoading,
    error: movieError,
  } = useFetch(() => fetchMovies({ query: "" }));

  const navigateToSearch = () => {
    router.push("/SearchScreen");
  };

  return (
    <View className="flex-1 bg-primary">
      <Image source={images.bg} className=" absolute w-full h-full z-0" />
      <ScrollView
        className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 10, minHeight: "100%" }}>
        <Image source={icons.logo} className="w-12 h-10 mt-20 mb-5 mx-auto" />
        {movieLoading || trendLoading ? (
          <ActivityIndicator
            size="large"
            color="000ff"
            className="mt-10 self-center"
          />
        ) : movieError || trendError ? (
          <Text>Error: {movieError?.message || trendError?.message}</Text>
        ) : (
          //main content
          <View className="flex-1 mt-5">
            <Searchbar
              onPress={navigateToSearch}
              placeholder="Search for a movie"
            />

            {trendMovies && (
              <>
                <View className="my-10">
                  <Text className="text-lg text-white font-bold mb-3">
                    Trending Movies
                  </Text>
                </View>
                <FlatList
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  ItemSeparatorComponent={() => <View className="w-4" />}
                  data={trendMovies}
                  className="mb-4 mt-3"
                  renderItem={({ item, index }) => (
                    <TrendCard movie={item} index={index} />
                  )}
                  keyExtractor={(item) => item.movie_id.toString()}
                />
              </>
            )}
            <>
              <Text className="text-lg text-white font-bold mt-5 mb-3">
                Latest Movie
              </Text>

              <FlatList
                data={movies}
                renderItem={({ item }) => <MovieCard {...item} />}
                keyExtractor={(item) => item.id.toString()}
                numColumns={3}
                columnWrapperStyle={{
                  justifyContent: "flex-start",
                  gap: 20,
                  paddingRight: 5,
                  marginBottom: 10,
                }}
                className="mt-2 pb-32"
                scrollEnabled={false}
              />
            </>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
