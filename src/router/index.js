import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Platform,
  SafeAreaView,
} from 'react-native';
import {
  Splash,
  Login,
  Home,
  Favorites,
  Profile,
  Sell,
  SellStep2,
  SellStep3,
  WebViewScene as TermsAndConditions,
  PrivacyPolicy,
} from '../containers';
import {
  Router,
  Scene,
  Tabs,
  Drawer,
  ActionConst,
  Actions,
  Stack,
} from 'react-native-router-flux';
import {ConstantUtils} from '../utils';
import {colors, images, strings, fonts} from '../themes';
import {moderateScale} from '../utils/ResponsiveUi';

const TAG = 'Route';
export default class Route extends Component {
  constructor(props) {
    super(props);
    this.state = {
      launchScreens: 1,
      loading: false,
      backPressed: 1,
      token: '',
    };
  }

  // async componentDidMount() {}

  render() {
    const {launchScreens} = this.state;
    return (
      <Router>
        <Stack key="root">
          <Scene
            hideNavBar
            key={ConstantUtils.SPLASH}
            component={Splash}
            initial
          />
          <Scene
            hideNavBar
            key={ConstantUtils.LOGIN}
            type={ActionConst.REPLACE}
            component={Login}
          />
          <Scene
            key={ConstantUtils.TERMS}
            back={true}
            title={'Terms And Conditions'}
            component={TermsAndConditions}
          />
          <Scene
            key={ConstantUtils.PRIVACY}
            back={true}
            title={'Privacy Policy'}
            component={PrivacyPolicy}
          />
          <Scene
            hideNavBar
            key={ConstantUtils.SELL}
            component={Sell}
            animationEnabled={false}
            duration={0}
          />
          <Scene
            hideNavBar
            key={ConstantUtils.SELLSTEP2}
            component={SellStep2}
            duration={0}
            animationEnabled={false}
          />
          <Scene
            hideNavBar
            key={ConstantUtils.SELLSTEP3}
            component={SellStep3}
            duration={0}
            animationEnabled={false}
          />
          {/* <Tabs
            key={ConstantUtils.MAIN}
            routeName={'Main'}
            showLabel={false}
            tabBarStyle={styles.tabBarStyle}
            wrap={false}
            hideNavBar
            {...this.props}>
            <Scene
              hideNavBar
              key={ConstantUtils.HOME}
              title={ConstantUtils.BUY}
              component={Home}
              icon={TabIcon}
            />
            <Scene
              hideNavBar
              key={ConstantUtils.NEAR_By}
              title={ConstantUtils.SELL}
              component={Sell}
              icon={TabIcon}
            />
            <Scene
              hideNavBar
              key={ConstantUtils.MESSAGE}
              title={ConstantUtils.FAVORITES}
              component={Favorites}
              icon={TabIcon}
            />
            <Scene
              hideNavBar
              key={ConstantUtils.FRIENDS}
              title={ConstantUtils.PROFILE}
              component={Profile}
              icon={TabIcon}
            />
          </Tabs> */}
        </Stack>
      </Router>
    );
  }
}

class TabIcon extends React.Component {
  render() {
    /** some styling **/
    return (
      <View style={styles.tabIconView}>
        {this.props.title == ConstantUtils.BUY ? (
          <Image
            source={this.getTabIcon(this.props.title)}
            resizeMode={'contain'}
            style={[
              styles.tabIcon,
              {
                tintColor: this.props.focused
                  ? colors.colorBlue
                  : colors.font_tab,
                height: moderateScale(15),
                width: moderateScale(22),
              },
            ]}
          />
        ) : (
          <Image
            source={this.getTabIcon(this.props.title)}
            resizeMode={'contain'}
            style={[
              styles.tabIcon,
              {
                tintColor: this.props.focused
                  ? colors.colorBlue
                  : colors.font_tab,
                height: moderateScale(15),
                width: moderateScale(22),
              },
            ]}
          />
        )}
        <Text
          style={{
            color: this.props.focused ? colors.colorBlue : colors.font_tab,
            fontSize: moderateScale(14),
            marginTop:
              Platform.OS === 'android' ? moderateScale(4) : moderateScale(8),
          }}>
          {this.props.title}
        </Text>
      </View>
    );
  }

  getTabIcon(title) {
    if (title == ConstantUtils.BUY) {
      return images.tab_car;
    } else if (title == ConstantUtils.SELL) {
      return images.tab_sell;
    } else if (title == ConstantUtils.FAVORITES) {
      return images.tab_fav;
    } else if (title == ConstantUtils.PROFILE) {
      return images.tab_Profile;
    } else {
      return images.home;
    }
  }
}

const styles = StyleSheet.create({
  tabBarStyle: {
    backgroundColor: colors.colorWhite,
    height: moderateScale(74),
  },
  view_tab_item: {
    backgroundColor: colors.colorWhite,
    width: '100%',
    height: moderateScale(60),
    justifyContent: 'center',
    alignItems: 'center',
  },
  image_tab: {
    height: moderateScale(24),
    width: moderateScale(24),
  },
  tabIconView: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop:
      Platform.OS === 'android' ? moderateScale(8) : moderateScale(16),
  },
  tabIcon: {
    height: moderateScale(20),
  },
});
