import { View, Text, Image, FlatList, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { images } from "@/constants/images";
import useFetch from "@/services/useFetch";
import { fetchMovies } from "@/services/api";
import MovieCard from "@/components/MovieCard";
import { useRouter } from "expo-router";
import { icons } from "@/constants/icons";
import Searchbar from "@/components/searchbar";
import { updateSearchCount } from "@/services/appwrite";

const SearchScreen = () => {
  const [search, setSearch] = useState("");
  const {
    data: movies,
    loading: movieLoading,
    error: movieError,
    refetch: loadMovies,
    reset,
  } = useFetch(() => fetchMovies({ query: search }));

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (search.trim()) {
        loadMovies();
      } else {
        reset();
      }
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [search]);
  // Add movies as a dependency

  useEffect(() => {
    if (Array.isArray(movies) && movies.length > 0 && movies?.[0]) {
      updateSearchCount(search, movies[0]);
    }
  }, [movies]);

  return (
    <View className="flex-1 bg-primary">
      <Image
        source={images.bg}
        className="flex-1 absolute w-full z-0"
        resizeMode="cover"
      />
      <FlatList
        data={movies}
        renderItem={({ item }) => <MovieCard {...item} />}
        keyExtractor={(item) => item.id.toString()}
        className="px-5"
        numColumns={3}
        columnWrapperStyle={{
          justifyContent: "center",
          gap: 16,
          marginVertical: 16,
        }}
        contentContainerStyle={{ paddingBottom: 100 }}
        ListHeaderComponent={
          <>
            <View className="w-full flex-row justify-center mt-20">
              <Image source={icons.logo} className="w-12 h-10" />
            </View>
            <View className="my-5">
              <Searchbar
                placeholder="Search movies..."
                value={search}
                onChangeText={(text: string) => setSearch(text)}
              />
            </View>
            {movieLoading && (
              <ActivityIndicator
                size="large"
                color="#0000ff"
                className="my-3r"
              />
            )}
            {movieError && (
              <Text className="text-red-500 px-5 my-3">
                Error: {movieError.message}
              </Text>
            )}
            {!movieLoading &&
              !movieError &&
              search.trim() &&
              movies?.length > 0 && (
                <Text className="text-xl text-white">
                  Search Result for{" "}
                  <Text className="text-accent">{search}</Text>
                </Text>
              )}
          </>
        }
        ListEmptyComponent={
          !movieLoading && !movieError ? (
            <View className="mt-10 px-5">
              <Text className="text-center text-gray-500">
                {search.trim() ? "No movies find" : "Search for movies"}
              </Text>
            </View>
          ) : null
        }
      />
    </View>
  );
};

export default SearchScreen;
