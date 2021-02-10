import App from 'next/app';
import getConfig from 'next/config';
import firebase from 'firebase';
import { ConfigProvider as ConfigProviderAntd } from 'antd';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import withRedux from 'next-redux-wrapper';
import createStore from '../redux/store';
import Notification from '../common/components/Notification';
import { locale as localeConstants } from '../common/constants';
import getTranslations from '../locales';
import '../assets/styles/global.less';

class Ziqitza extends App {
  static async getInitialProps({ Component, ctx }) {
    const pageProps = Component.getInitialProps ? await Component.getInitialProps({ ctx }) : {};
    // anything returned here can be access by the client
    return { pageProps };
  }

  componentDidMount() {
    const { publicRuntimeConfig } = getConfig();
    const { firebaseApi } = publicRuntimeConfig;
    firebase.initializeApp(firebaseApi);
  }

  render() {
    const { Component, pageProps, store } = this.props;
    const {
      View = React.Fragment, Layout = React.Fragment, RouteGuard = React.Fragment,
    } = Component;
    // note: update here as change local get implemented over app.
    const localeName = localeConstants.EN;
    const translations = getTranslations(localeName);
    return (
      <Provider store={store}>
        <IntlProvider locale={localeName} messages={translations}>
          <ConfigProviderAntd>
            <Notification />
            <RouteGuard>
              <Layout>
                <View {...pageProps} />
              </Layout>
            </RouteGuard>
          </ConfigProviderAntd>
        </IntlProvider>
      </Provider>
    );
  }
}

// withRedux wrapper that passes the store to the App Component
export default withRedux(createStore)(Ziqitza);
