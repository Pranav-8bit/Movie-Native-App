import {View, Text, ImageBackground, Image} from "react-native";
import React from "react";
import {Tabs} from "expo-router";
import {images} from "@/constants/images";
import {icons} from "@/constants/icons";

const TabIcon = ({Icon, tabName, focussed}: any) => {
    if (focussed) {
        return (
            <ImageBackground
                source={images.highlight}
                className="flex flex-row w-full flex-1 min-w-[112px]
                min-h-16 mt-4 justify-center items-center rounded-full overflow-hidden">
                <Image source={Icon} tintColor="#151312" className="size-5"/>
                <Text className="text-secondary text-base font-semibold ml-2">{tabName}</Text>
            </ImageBackground>
        )
    }

    return (
        <View className="size-full justify-center items-center mt-4 rounded-full">
            <Image source={Icon} tintColor="#A8B5DB" className="size-5"/>
        </View>
    )
}

const _layout = () => {
    return (
        <Tabs screenOptions={{
            tabBarShowLabel: false,
            tabBarItemStyle: {width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center'},
            tabBarStyle: {
                backgroundColor: "#0f0D23",
                borderRadius: 50,
                marginHorizontal: 20,
                marginBottom: 36,
                height: 52,
                position: "absolute",
                overflow: "hidden",
                borderWidth: 1,
                borderColor: '#0f0d23'
            }
        }}>
            <Tabs.Screen
                name="index"
                options={{
                    title: "home",
                    headerShown: false,
                    tabBarIcon: ({focused}) => (
                        <TabIcon Icon={icons.home} tabName={"Home"}
                                 focussed={focused}/>)
                }}
            />
            <Tabs.Screen
                name="search"
                options={{
                    title: "search", headerShown: false,
                    tabBarIcon: ({focused}) => (
                        <TabIcon Icon={icons.search} tabName={"Search"}
                                 focussed={focused}/>)
                }}
            />
            <Tabs.Screen
                name="saved"
                options={{
                    title: "saved", headerShown: false,
                    tabBarIcon: ({focused}) => (
                        <TabIcon Icon={icons.save} tabName={"Saved"}
                                 focussed={focused}/>)
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: "profile", headerShown: false,
                    tabBarIcon: ({focused}) => (
                        <TabIcon Icon={icons.person} tabName={"Profile"}
                                 focussed={focused}/>)
                }}
            />
        </Tabs>
    );
};

export default _layout;
