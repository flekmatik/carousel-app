import * as React from 'react';
import { CarouselPage, horizontalMargin, ICarouselPage } from './CarouselPage';
import { createRef } from 'react';
import { style } from 'typestyle';
import { Fab } from '@material-ui/core';
import { NavigateBefore, NavigateNext } from '@material-ui/icons';
import { animated, Spring } from 'react-spring';

const rootStyle = style({
    position: 'relative',
    maxWidth: 'fit-content',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden'
});

const selectedIndicatorStyle = style({
    height: 5,
    borderRadius: '20%',
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'grey'
});

const navigationStyle = style({
    position: 'absolute',
    zIndex: 1000
});

const overflowStyle = style({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden'
});

interface ICarouselProps {
    pages: ICarouselPage[];
    type?: 'rect' | 'circle';
    itemWidth?: number;
    pageIndex: number;
    onChangePage: (pageIndex: number) => void;
}

interface ICarouselState {
    width?: number;
    scroll?: number;
}

/**
 * Generic component providing carousel functionality.
 * Page term refers to one carousel item. Current implementation presents multiple Pages on one screen
 * when possible.
 */
export class Carousel extends React.PureComponent<ICarouselProps, ICarouselState> {
    divRef = createRef<HTMLDivElement>();

    constructor(props: ICarouselProps) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        this.resizeObserver.observe(this.divRef.current!);
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
                width: newWidth,
                scroll: this.divRef.current?.scrollLeft
            });
        }
    }

    getPageWidth = () => Math.min(this.props.itemWidth || 200, this.state.width! - 2 * horizontalMargin || Infinity);

    handlePageChange = (pageIndex: number, skipOnUpdate?: boolean) => {
        const pageWidth = this.getPageWidth() + 2 * horizontalMargin;
        const left = pageIndex * pageWidth;
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
        !skipOnUpdate && this.props.onChangePage(pageIndex);
    }

    resizeObserver = new ResizeObserver(this.handleResize);

    render() {
        const pageWidth = this.getPageWidth();
        return (
            <div
                ref={this.divRef}
                className={rootStyle}
            >
                {this.props.pageIndex > 0 && (
                    <Fab
                        style={{ left: 10 }}
                        color="secondary"
                        className={navigationStyle}
                        size="small"
                        onClick={() => this.handlePageChange(this.props.pageIndex - 1)}
                    >
                        <NavigateBefore />
                    </Fab>
                )}
                <Spring from={{}} to={{ scroll: this.state.scroll }}>
                    {({ scroll }) => (
                        <animated.div
                            className={overflowStyle}
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
                        position: this.props.pageIndex * (pageWidth + 2 * horizontalMargin) // move behind items before selection
                            + pageWidth * 0.1 + horizontalMargin // move relative to selected item (
                            - (this.state.scroll || 0) // offset current scroll value
                    }}
                >
                    {({ position }) => (
                        <animated.div
                            className={selectedIndicatorStyle}
                            style={{
                                left: position,
                                width: pageWidth * 0.8
                            }}
                        />
                    )}
                </Spring>
                {this.props.pageIndex < this.props.pages.length - 1 && (
                    <Fab
                        style={{ right: 10 }}
                        color="secondary"
                        className={navigationStyle}
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
