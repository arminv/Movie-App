import React, { useEffect } from 'react';
import { Link as LinkRoute, useHistory } from 'react-router-dom';
import { throttle } from 'lodash';

import { search_movies_by_name } from '../api/index';

import { connect } from 'react-redux';
import {
  setSearchQuery,
  setSearchResults,
  setSearchPage,
  logout,
} from '../redux/actions';

import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
// import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
// import AccountCircle from '@material-ui/icons/AccountCircle';
// import NotificationsIcon from '@material-ui/icons/Notifications';
import HomeIcon from '@material-ui/icons/Home';
import MoreIcon from '@material-ui/icons/MoreVert';
import ShopIcon from '@material-ui/icons/Shop';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import VpnKeyIcon from '@material-ui/icons/VpnKey';

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.25),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.35),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));

const Navbar = (props) => {
  const history = useHistory();

  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  // Throttle the search via lodash and add both query and results to the store:
  const throttledSearch = throttle(async (query) => {
    history.push(`/`);

    if (query === '') {
      props.setSearchQuery('');
      props.setSearchResults([], props.searchPage, 0);
      props.setSearchPage(1);
      return;
    }

    const [searchResults, searchTotalPages] = await search_movies_by_name(
      query,
      props.searchPage
    );

    props.setSearchQuery(query);
    props.setSearchResults(searchResults, props.searchPage, searchTotalPages);
  }, 500);

  const handleSearch = (query) => {
    throttledSearch(query);
  };

  useEffect(() => {
    handleSearch(props.searchQuery);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props]);

  // const handleProfileMenuOpen = (event) => {
  //   setAnchorEl(event.currentTarget);
  // };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      {props.auth.isAuthenticated ? (
        <div>
          <MenuItem>
            <LinkRoute
              to={`/`}
              style={{ textDecoration: 'none', color: 'blue' }}
            >
              <HomeIcon />
              <p style={{ color: 'black' }}>Home</p>
            </LinkRoute>
          </MenuItem>
          <MenuItem>
            <LinkRoute
              to={`/cart`}
              style={{ textDecoration: 'none', color: 'blue' }}
            >
              <IconButton
                aria-label='show 11 new notifications'
                color='inherit'
              >
                {/* <Badge
                  badgeContent={Object.keys(props.userMovies).length}
                  color='secondary'
                > */}
                  <ShopIcon />
                {/* </Badge> */}
              </IconButton>
              <p style={{ color: 'black' }}>My Movies</p>
            </LinkRoute>
          </MenuItem>
          <MenuItem onClick={props.logout}>
            <LinkRoute
              to={`/`}
              style={{ textDecoration: 'none', color: 'blue' }}
            >
              <ExitToAppIcon />
              <p style={{ color: 'black' }}>Logout</p>
            </LinkRoute>
          </MenuItem>
        </div>
      ) : (
        <div>
          <MenuItem>
            <LinkRoute
              to={`/`}
              style={{ textDecoration: 'none', color: 'blue' }}
            >
              <HomeIcon />
              <p style={{ color: 'black' }}>Home</p>
            </LinkRoute>
          </MenuItem>
          <MenuItem>
            <LinkRoute
              to={`/login`}
              style={{ textDecoration: 'none', color: 'blue' }}
            >
              <VpnKeyIcon />
              <p style={{ color: 'black' }}>Log In</p>
            </LinkRoute>
          </MenuItem>
          <MenuItem>
            <LinkRoute
              to={`/register`}
              style={{ textDecoration: 'none', color: 'blue' }}
            >
              <LockOpenIcon />
              <p style={{ color: 'black' }}>Sign Up</p>
            </LinkRoute>
          </MenuItem>
        </div>
      )}

      {/* <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label='account of current user'
          aria-controls='primary-search-account-menu'
          aria-haspopup='true'
          color='inherit'
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem> */}
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar position='static'>
        <Toolbar>
          {/* <IconButton
            edge='start'
            className={classes.menuButton}
            color='inherit'
            aria-label='open drawer'
          >
            <MenuIcon />
          </IconButton> */}
          <Typography className={classes.title} variant='h6' noWrap>
            <LinkRoute
              to={'/'}
              style={{ textDecoration: 'none', color: 'white' }}
            >
              Movie App
            </LinkRoute>
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder='Search Movies…'
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
              onInput={(e) => handleSearch(e.target.value)}
              autoFocus={true}
            />
          </div>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            {props.auth.isAuthenticated ? (
              <div>
                <LinkRoute
                  to={`/cart`}
                  style={{ textDecoration: 'none', color: 'white' }}
                >
                  <IconButton aria-label='show 4 new mails' color='inherit'>
                    {/* <Badge
                      badgeContent={Object.keys(props.userMovies).length}
                      color='secondary'
                    > */}
                      <ShopIcon />
                    {/* </Badge> */}
                  </IconButton>
                </LinkRoute>
                <IconButton
                  onClick={props.logout}
                  aria-label='show 4 new mails'
                  color='inherit'
                >
                  <Badge color='secondary'>
                    <ExitToAppIcon />
                  </Badge>
                </IconButton>
              </div>
            ) : (
              <div>
                <LinkRoute
                  to={`/login`}
                  style={{ textDecoration: 'none', color: 'white' }}
                >
                  <IconButton aria-label='show 4 new mails' color='inherit'>
                    <Badge color='secondary'>
                      <VpnKeyIcon />
                    </Badge>
                  </IconButton>
                </LinkRoute>
                <LinkRoute
                  to={`/register`}
                  style={{ textDecoration: 'none', color: 'white' }}
                >
                  <IconButton aria-label='show 4 new mails' color='inherit'>
                    <LockOpenIcon />
                  </IconButton>
                </LinkRoute>
              </div>
            )}
            {/* <IconButton
              edge='end'
              aria-label='account of current user'
              aria-controls={menuId}
              aria-haspopup='true'
              onClick={handleProfileMenuOpen}
              color='inherit'
            >
              <AccountCircle />
            </IconButton> */}
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label='show more'
              aria-controls={mobileMenuId}
              aria-haspopup='true'
              onClick={handleMobileMenuOpen}
              color='inherit'
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    searchPage: state.lastPageReducer.searchPage,
    searchQuery: state.searchReducer.searchQuery,
    auth: state.authReducer,
    // userMovies: state.moviesReducer.userMovies,
  };
};

export default connect(mapStateToProps, {
  setSearchQuery,
  setSearchResults,
  setSearchPage,
  logout,
})(Navbar);
