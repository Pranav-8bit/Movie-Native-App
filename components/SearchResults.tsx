import React from "react";
import { View, Text, ActivityIndicator, FlatList } from "react-native";
import { useMovies } from "../hooks/useMovies";

const SearchResults = ({ search }) => {
  const { movies, movieLoading, movieError } = useMovies(search);

  return (
    <View>
      {movieLoading && <ActivityIndicator size="large" color="#00ff00" />}
      {movieError && <Text>Error: {movieError.message}</Text>}
      {!movieLoading &&
        !movieError &&
        search.trim() &&
        movies?.length === 0 && (
          <Text className="text-xl text-white">
            Search Result for <Text className="text-accent">{search}</Text>
          </Text>
        )}
      <FlatList
        data={movies}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View>
            <Text>{item.title}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default SearchResults;
