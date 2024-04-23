import { Flex, MantineProvider } from '@mantine/core';

const MainLayout = ({ children }: { children: React.ReactElement }) => {
  return (
    <MantineProvider>
      <Flex>
        <Flex>{children}</Flex>
      </Flex>
    </MantineProvider>
  );
};

export default MainLayout;
