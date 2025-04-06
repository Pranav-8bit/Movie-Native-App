//track serach by user
import { Client, Databases, ID, Query } from "react-native-appwrite";

const DATABASE_ID = process.env.EXPO_PUBLIC_APP_WRITE_DATABASE_ID!;
const COLLECTION_ID = process.env.EXPO_PUBLIC_APP_WRITE_COLLECTION_ID!;

console.log(
  process.env.EXPO_PUBLIC_APP_WRITE_DATABASE_ID,
  process.env.EXPO_PUBLIC_APP_WRITE_COLLECTION_ID,
  process.env.EXPO_PUBLIC_APP_WRITE_PROJECT_ID
);

const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject(process.env.EXPO_PUBLIC_APP_WRITE_PROJECT_ID!);

const database = new Databases(client);
export const updateSearchCount = async (query: string, movie: Movie) => {
  try {
    console.log("1");
    const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.equal("searchTerm", query),
    ]);
    console.log(result, "esult", query);
    if (result.documents.length > 0) {
      const existingMovie = result.documents[0];
      await database.updateDocument(
        DATABASE_ID,
        COLLECTION_ID,
        existingMovie.$id,
        {
          Count: existingMovie.Count + 1,
        }
      );
    } else {
      await database.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
        searchTerm: query,
        movie_id: movie.id,
        Count: 1,
        title: movie.title,
        post_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
      });
    }
  } catch (err) {
    throw err;
  }
};

export const trendingMovies = async (): Promise<
  TrendingMovie[] | undefined
> => {
  try {
    const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.limit(5),
      Query.orderDesc("Count"),
    ]);
    return result.documents as unknown as TrendingMovie[];
  } catch (err) {
    console.log(err);
    return undefined;
  }
};
