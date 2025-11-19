import ConfigProvider from 'components/ConfigProvider';
import RouterWrapper from 'components/RouterWrapper';
import dayjs from 'dayjs';
import 'dayjs/locale/vi';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import localeData from 'dayjs/plugin/localeData';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import weekday from 'dayjs/plugin/weekday';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import weekYear from 'dayjs/plugin/weekYear';
import { RouterProvider } from 'react-router-dom';
import { routers } from 'routes';

dayjs.extend(customParseFormat);
dayjs.extend(advancedFormat);
dayjs.extend(weekday);
dayjs.extend(localeData);
dayjs.extend(weekOfYear);
dayjs.extend(weekYear);
dayjs.extend(timezone);
dayjs.extend(utc);
dayjs.locale('vi');

function App() {
  return (
    <ConfigProvider>
      <RouterWrapper>
        <RouterProvider router={routers} />
      </RouterWrapper>
    </ConfigProvider>
  );
}

export default App;
