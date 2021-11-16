import * as React from 'react';
import { CarouselPage, horizontalMargin, ICarouselPage } from './CarouselPage';
import { createRef } from 'react';
import { createStyles, Fab, Theme, WithStyles, withStyles } from '@material-ui/core';
import { NavigateBefore, NavigateNext } from '@material-ui/icons';
import { animated, Spring } from 'react-spring';
import { CarouselIndicator } from './CarouselIndicator';

const styles = (theme: Theme) => createStyles({
    rootClass: {
        position: 'relative',
        maxWidth: 'fit-content',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        overflow: 'hidden'
    },
    navigationClass: {
        position: 'absolute',
        zIndex: 1000
    },
    overflowClass: {
        display: 'flex',
        flexDirection: 'row',
        userSelect: 'none',
        alignItems: 'center',
        overflow: 'hidden'
    }
});

interface ICarouselProps extends WithStyles<typeof styles> {
    pages: ICarouselPage[];
    type?: 'rect' | 'circle';
    itemWidth?: number;
    pageIndex: number;
    centered?: boolean;
    onChangePage: (pageIndex: number) => void;
}

interface ICarouselState {
    width?: number;
    scroll: number;
}

/**
 * Generic component providing carousel functionality.
 * Page term refers to one carousel item. Current implementation presents multiple Pages on one screen
 * when possible.
 */
class CarouselPure extends React.PureComponent<ICarouselProps, ICarouselState> {
    divRef = createRef<HTMLDivElement>();

    constructor(props: ICarouselProps) {
        super(props);
        this.state = {
            scroll: 0
        };
    }

    componentDidMount() {
        this.resizeObserver.observe(this.divRef.current!);
        this.handlePageChange(this.props.pageIndex, true);
    }

    componentWillUnmount() {
        this.resizeObserver.disconnect();
    }

    componentDidUpdate(prevProps: Readonly<ICarouselProps>) {
        if (prevProps.pageIndex !== this.props.pageIndex) {
            this.handlePageChange(this.props.pageIndex, true);
        }
    }

    handleResize = () => {
        const newWidth = this.divRef.current?.offsetWidth;
        if (newWidth !== this.state.width) {
            this.setState({
                width: newWidth
            }, () => this.handlePageChange(this.props.pageIndex, true));
        }
    }

    getPageWidth = () => Math.min(this.props.itemWidth || 200, this.state.width! - 2 * horizontalMargin || Infinity);

    handlePageChange = (pageIndex: number, skipOnUpdate?: boolean) => {
        const pageWidth = this.getPageWidth() + 2 * horizontalMargin;
        const left = (pageIndex + 1) * pageWidth;
        if (this.props.centered) {
            this.setState({
                scroll: left + pageWidth / 2 - this.divRef.current!.offsetWidth / 2
            });
        } else {
            if (this.state.scroll! > left) {
                this.setState({
                    scroll: left
                });
            }
            const right = left + pageWidth;
            if (this.state.scroll! + this.divRef.current!.offsetWidth < right) {
                this.setState({
                    scroll: right - this.divRef.current!.offsetWidth
                });
            }
        }
        !skipOnUpdate && this.props.onChangePage(pageIndex);
    }

    resizeObserver = new ResizeObserver(this.handleResize);

    render() {
        const classes = this.props.classes;
        this.props.centered && console.log('sc', this.state.scroll)
        const pageWidth = this.getPageWidth();
        return (
            <div
                ref={this.divRef}
                className={classes.rootClass}
            >
                {this.props.pageIndex > 0 && (
                    <Fab
                        style={{ left: 10 }}
                        color="primary"
                        className={classes.navigationClass}
                        size="small"
                        onClick={() => this.handlePageChange(this.props.pageIndex - 1)}
                    >
                        <NavigateBefore />
                    </Fab>
                )}
                <Spring from={{}} to={{ scroll: this.state.scroll }}>
                    {({ scroll }) => (
                        <animated.div
                            className={classes.overflowClass}
                            style={{
                                padding: `0 ${pageWidth + 2 * horizontalMargin}px`
                            }}
                            scrollLeft={scroll}
                        >
                            {this.props.pages.map((page, index) => (
                                <CarouselPage
                                    key={index}
                                    width={pageWidth}
                                    page={page}
                                    type={this.props.type}
                                    onClick={() => this.handlePageChange(index)}
                                />
                            ))}
                        </animated.div>
                    )}
                </Spring>
                <Spring
                    from={{}}
                    to={{
                        position: (this.props.pageIndex + 1) * (pageWidth + 2 * horizontalMargin) // move behind items before selection
                            + pageWidth * 0.1 + horizontalMargin // move relative to selected item (
                            - (this.state.scroll || 0) // offset current scroll value
                    }}
                >
                    {({ position }) => (
                        <animated.div
                            style={{
                                position: 'absolute',
                                left: position,
                                width: pageWidth * 0.8,
                                bottom: 0
                            }}
                        >
                            <CarouselIndicator />
                        </animated.div>
                    )}
                </Spring>
                {this.props.pageIndex < this.props.pages.length - 1 && (
                    <Fab
                        style={{ right: 10 }}
                        color="primary"
                        className={classes.navigationClass}
                        data-testid="carousel-next-button"
                        size="small"
                        onClick={() => this.handlePageChange(this.props.pageIndex + 1)}
                    >
                        <NavigateNext />
                    </Fab>
                )}
            </div>
        );
    }
}

export const Carousel = withStyles(styles)(CarouselPure);