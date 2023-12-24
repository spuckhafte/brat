import { FlatList, StyleSheet, Text, View } from "react-native"
import Take from "src/components/util/Take"

const data = getData();
const style = getStyle();

export default () => {
    return (
        <View style={style.container}>
            <FlatList 
                data={data}
                renderItem={({item}) => <Take {...item} />}
                style={style.list}
            />
        </View>
    )
}

function getStyle() {
    return StyleSheet.create({
        container: {
        
        },
        list: {
            marginTop: 10,
            marginBottom: 60,
        }
    });
}

function getData(): {
    username: string;
    time: string;
    title: string;
    body: string;
    likes: number;
    dislikes: number;
    userPostLikeStatus: boolean | null;
}[] {
    return [

        {
            username: "user123",
            time: "2d ago",
            title: "First Post",
            body: "This is the body of the first post. It's a short message to start the discussion.",
            likes: 8,
            dislikes: 3,
            userPostLikeStatus: true,
        },
        {
            username: "john_doe",
            time: "1d ago",
            title: "Awesome Day",
            body: "Spent a fantastic day outdoors, exploring nature and enjoying the sunshine. The weather was perfect, and I had the chance to go on a hike and take some breathtaking photos. I'm grateful for moments like these!",
            likes: 15,
            dislikes: 2,
            userPostLikeStatus: false,
        },
        {
            username: "happy_blogger",
            time: "3d ago",
            title: "Travel Adventure",
            body: "Just returned from an amazing journey across different countries. Explored diverse cultures, tasted delicious local cuisines, and met wonderful people. Traveling broadens the mind and provides a unique perspective on life.",
            likes: 20,
            dislikes: 5,
            userPostLikeStatus: null,
        },
        {
            username: "coding_pro",
            time: "5d ago",
            title: "Code Mastery",
            body: "Achieved a coding milestone today! After days of hard work and debugging, I finally cracked a complex problem. The feeling of accomplishment is incredible. Coding is both challenging and rewarding!",
            likes: 25,
            dislikes: 8,
            userPostLikeStatus: true,
        },
        {
            username: "book_lover",
            time: "2d ago",
            title: "Book Recommendation",
            body: "Read an incredible book recently. The plot was gripping, characters well-developed, and the writing style was superb. Highly recommend it to fellow book lovers! Let's discuss literature!",
            likes: 12,
            dislikes: 4,
            userPostLikeStatus: false,
        },
        {
            username: "gamer123",
            time: "4d ago",
            title: "Gaming Highlights",
            body: "Epic gaming session last night! Played some intense matches, made new friends online, and experienced unexpected plot twists in a story-driven game. Gaming is not just a hobby; it's a form of art and entertainment.",
            likes: 18,
            dislikes: 6,
            userPostLikeStatus: true,
        },
        {
            username: "fitness_guru",
            time: "1d ago",
            title: "Fitness Update",
            body: "Reached a new personal best at the gym today! Hard work and dedication are paying off. Remember, fitness is a journey, not a destination. Let's motivate each other to stay healthy and active!",
            likes: 30,
            dislikes: 2,
            userPostLikeStatus: false,
        },
        {
            username: "tech_enthusiast",
            time: "3d ago",
            title: "Latest Tech News",
            body: "Exciting developments in the tech world! From groundbreaking innovations to the latest gadgets, there's always something new happening. What's your take on the future of technology?",
            likes: 22,
            dislikes: 7,
            userPostLikeStatus: null,
        },
        {
            username: "foodie_adventures",
            time: "2d ago",
            title: "Culinary Delights",
            body: "Tried some delicious dishes today! Explored a new restaurant and indulged in a variety of flavors. Food brings people together, and sharing culinary experiences is a joy. Any food recommendations?",
            likes: 14,
            dislikes: 3,
            userPostLikeStatus: true,
        },
        {
            username: "nature_lover",
            time: "5d ago",
            title: "Nature Retreat",
            body: "Spent the weekend surrounded by nature. The peacefulness of the forest, the sound of birds chirping, and the fresh air rejuvenated my soul. Nature has a way of grounding us and providing much-needed tranquility.",
            likes: 26,
            dislikes: 4,
            userPostLikeStatus: false,
        },
    ];
}