import { useState } from 'react';
import { useGeneralStore } from '../stores/generalStore';
import { useUserStore } from '../stores/userStore';
import {
  Navbar,
  Center,
  Tooltip,
  UnstyledButton,
  createStyles,
  Stack,
  rem,
} from '@mantine/core';

import {
  IconUser,
  IconLogout,
  IconBrandMessenger,
  IconBrandWechat,
  IconLogin,
} from '@tabler/icons-react';

import { useMutation } from '@apollo/client';
import { LOGOUT_USER } from '../graphql/mutations/Logout';

const useStyles = createStyles((theme) => {
  return {
    lint: {
      width: rem(50),
      height: rem(50),
      borderRadius: theme.radius.md,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[0]
          : theme.colors.gray[7],

      '&:hover': {
        backgroundColor:
          theme.colorScheme === 'dark'
            ? theme.colors.dark[5]
            : theme.colors.gray[0],
      },
    },
    active: {
      '&, &:hover': {
        backgroundColor: theme.fn.variant({
          variant: 'light',
          color: theme.primaryColor,
        }).background,
        color: theme.fn.variant({ variant: 'light', color: theme.primaryColor })
          .color,
      },
    },
  };
});

interface NavbarLinkProps {
  icon: React.FC<any>;
  label: string;
  active?: boolean;
  onClick?(): void;
}

function NavbarLink({ icon: Icon, label, active, onClick }: NavbarLinkProps) {
  const { classes, cx } = useStyles();
  return (
    <Tooltip
      label={label}
      position="top-start"
      offset={-30}
      transitionProps={{ duration: 0 }}
    >
      <UnstyledButton
        onClick={onClick}
        className={cx(classes.link, { [classes.active]: active })} // Possibly classes.lint
      >
        <Icon size="1.2rem" stroke={1.5} />
      </UnstyledButton>
    </Tooltip>
  );
}

const mockdata = [{ icon: IconBrandWechat, label: 'Chatrooms' }];

function Sidebar() {
  const toggleProfileSettingsModal = useGeneralStore(
    (state) => state.toggleProfileSettingsModal
  );
  const [active, setActive] = useState(0);

  const links = mockdata.map((link, index) => (
    <NavbarLink
      {...link}
      key={link.label}
      active={index === active}
      onClick={() => setActive(index)}
    />
  ));
  const userId = useUserStore((state) => state.id);
  const user = useUserStore((state) => state);
  const setUser = useUserStore((state) => state.setUser);
  const [logoutUser, { loading, error }] = useMutation(LOGOUT_USER, {
    onCompleted: () => {
      toggleLoginModal();
    },
  });

  const handleLogout = async () => {
    await logoutUser();
    setUser({
      id: undefined,
      avatarUrl: null,
      fullname: '',
      email: '',
    });
  };

  return <div>Sidebar</div>;
}

export default Sidebar;
