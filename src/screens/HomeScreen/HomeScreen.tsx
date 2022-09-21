import { gql, useQuery } from '@apollo/client';
import { useNavigation } from '@react-navigation/native';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ModelSortDirection, PostByDateQuery, PostByDateQueryVariables } from '../../API';
import ApiErrorMessage from '../../components/ApiErrorMessage/ApiErrorMessage';
import FeedPost from '../../components/FeedPost/FeedPost';

export const postsByDate = gql`
  query PostByDate(
    $type: String!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelPostFilterInput
    $limit: Int
    $nextToken: String
  ) {
    postByDate(
      type: $type
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        description
        image
        video
        nofComments
        nofLikes
        userID
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        User {
          id
          name
          username
          image
        }
        Comments {
          items {
            id
            comment
            User {
              id
              name
            }
          }
        }
      }
      nextToken
      startedAt
    }
  }
`;

const SPACING = 20;
const AVATAR_SIZE = 70;

const HomeScreen = () => {
  // const [posts, setPosts] = useState([]);
  // const fetchAllPosts = async () => {
  //   const response = await API.graphql(graphqlOperation(listPosts));
  //   console.log(response);
  //   setPosts(response.data.listPosts.items);
  // };

  // useEffect(() => {
  //   fetchAllPosts();
  // }, []);

  const navigation = useNavigation();
  const { data, loading, error, refetch } = useQuery<PostByDateQuery, PostByDateQueryVariables>(
    postsByDate,
    {
      variables: {
        type: 'POST',
        sortDirection: ModelSortDirection.DESC,
        limit: 10,
      },
    }
  );

  if (loading) return <Text>Loading...</Text>;
  if (error) return <ApiErrorMessage title="Error fetching posts" message={error.message} />;

  const posts = (data?.postByDate?.items || []).filter((post) => !post?._deleted);

  return (
    <View style={{ flex: 1 }}>
      <Pressable onPress={() => navigation.navigate('NewTweet')} style={styles.header}>
        <Text style={styles.name}>What's on your mind?</Text>
        <Ionicons name="images" size={24} color="limegreen" style={styles.icon} />
      </Pressable>
      <FlatList
        data={posts}
        contentContainerStyle={{ padding: 2 }}
        renderItem={({ item }) => item && <FeedPost post={item} />}
        showsVerticalScrollIndicator={false}
        onRefresh={() => refetch()}
        refreshing={loading}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    padding: 10,
    paddingVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    backgroundColor: 'white',
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 25,
    marginRight: 10,
  },
  name: {
    color: 'gray',
  },
  icon: {
    marginLeft: 'auto',
  },
});

export default HomeScreen;
