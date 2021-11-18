import React from 'react';
import './App.css';
import { CollectionCarousel } from './components/CollectionCarousel';
import { StoryCarousel } from './components/StoryCarousel';
import { createStyles, Theme, Typography, withStyles, WithStyles } from '@material-ui/core';
import { loadInitDataThunk } from './store/thunks';
import { connect } from 'react-redux';
import { IDispatch } from './store';

const styles = (theme: Theme) => createStyles({
    "@keyframes gradientAnimation": {
        '0%': {
            backgroundPosition: `0% 50%`
        },
        '50%': {
            backgroundPosition: '100% 50%'
        },
        '100%': {
            backgroundPosition: '0% 50%'
        }
    },
    rootClass: {
        height: '100%',
        padding: '40px 10%',
        background: `linear-gradient(45deg, ${theme.palette.background.paper}, ${theme.palette.background.default})`,
        backgroundSize: '400% 400%',
        overflow: 'scroll',
        animation: `$gradientAnimation 10s ease infinite`
    },
    titleClass: {
        marginBottom: 20,
        textAlign: 'center'
    }
});

interface IAppProps extends WithStyles<typeof styles> {
    onLoad: () => void;
}

class AppPure extends React.Component<IAppProps> {
    componentDidMount() {
        this.props.onLoad();
    }

    render() {
        return (
            <div className={this.props.classes.rootClass}>
                <Typography
                    variant="h2"
                    className={this.props.classes.titleClass}
                >
                    Carousel Demo
                </Typography>
                <CollectionCarousel />
                <div style={{ height: 30 }} />
                <StoryCarousel />
            </div>
        );
    }
}

const mapDispatch = (dispatch: IDispatch) => ({
    onLoad: () => dispatch(loadInitDataThunk())
});

export const App = connect(undefined, mapDispatch)(withStyles(styles)(AppPure));
