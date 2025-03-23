import { registerRootComponent } from 'expo';

import App from './App';
import ClockApp from './ClockApp'
import MostBasicNavigatorApp from './MostBasicNavigatorApp';
import SecondSceneApp from './SecondSceneApp';
import NavigationBar from './NavigationBar';
import NavigationBarWithTransition from './NavigationBarWithTransitionApp';
import SplittingCodeApp from './SplittingCodeApp';
import ListViewApp from './MovieExplorerApp';

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
// registerRootComponent(App);
// registerRootComponent(ClockApp);
// registerRootComponent(MostBasicNavigatorApp);
// registerRootComponent(SecondSceneApp);
// registerRootComponent(NavigationBar);
// registerRootComponent(NavigationBarWithTransition);
// registerRootComponent(SplittingCodeApp);
registerRootComponent(ListViewApp);
