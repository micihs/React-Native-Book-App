import React from "react";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";
import { withTheme } from 'styled-components';

import SearchScreen from "../screens/SearchScreen";
import BookDetailScreen from "../screens/BookDetailsScreen";
import BookScreen from "../screens/BookScreen"
import LibraryListScreen from "../screens/LibraryListScreen";


function Navigation({ current }) {

    const Stack = createSharedElementStackNavigator();

    const fadeScreen = ({current}) => ({
        cardStyle: {
            opacity: current.progress,
        },
    });

    const bookTransition = {
        animation: 'spring',
        config: {
          mass: 3,
          damping: 300,
          stiffness: 1000,
          overshootClamping: false,
          restDisplacementThreshold: 10,
          restSpeedThreshold: 10,
        },
    };

    const searchTransition = {
        animation: 'spring',
        config: {
          mass: 3,
          damping: 300,
          stiffness: 1000,
          overshootClamping: false,
          restDisplacementThreshold: 10,
          restSpeedThreshold: 10,
        },
    };

    return (
        <Stack.Navigator
            initialRouteName="BookList"
            screenOptions={{
                headeShown: false,
                cardOverlayEnabled: true,
                cardStyle: { backgroundColor: 'transparent' },
            }}
            detachInactiveScreens={false}
        >
            <Stack.Screen name="Books" component={BookScreen}/>
            <Stack.Screen name="LibraryList" component={LibraryListScreen}/>
            <Stack.Screen name="BookDetails" 
                component={BookDetailScreen}
                sharedElements={(route, otherRoute) => {
                    if (['BookList', 'BookSearch'].includes(otherRoute.name)) {
                        return [route.params.book.bookId];
                    }
                    return [];
                }}
                options={{
                    gestureEnabled: false,
                    cardStyleInterpolator: fadeScreen,
                    transitionSpec: {
                      open: bookTransition,
                      close: bookTransition,
                    },
                }}
            />
            <Stack.Screen name="SearchScreen"
                component={SearchScreen}
                sharedElements={(_,otherRoute) => (otherRoute.name === "BookList" ? [{
                    id: 'search',
                    animation: 'fade',
                    resize: 'clip',
                    align: 'left-top',
                }] : [])}
                options={{
                    cardStyleInterpolator: fadeScreen,
                    transitionSpec: {
                      open: searchTranstion,
                      close: searchTranstion,
                    },
                }}

            />
        </Stack.Navigator>
    );
};

export default React.memo(Navigation);