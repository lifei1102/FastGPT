import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { serviceSideProps } from '@/web/common/utils/i18n';
import { useSystemStore } from '@/web/common/system/useSystemStore';
import { Box } from '@chakra-ui/react';

function Error() {
  const router = useRouter();
  const { lastRoute } = useSystemStore();

  useEffect(() => {
    setTimeout(() => {
      window.umami?.track('pageError', {
        userAgent: navigator.userAgent,
        platform: navigator.platform,
        appName: navigator.appName,
        lastRoute,
        route: router.asPath
      });
    }, 1000);

    setTimeout(() => {
      router.back();
    }, 2000);
  }, []);

  return (
    <Box whiteSpace={'pre-wrap'}>
      {`出现未捕获的异常。`}
    </Box>
  );
}

export async function getServerSideProps(context: any) {
  return {
    props: { ...(await serviceSideProps(context)) }
  };
}

export default Error;
