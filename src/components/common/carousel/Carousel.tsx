import * as React from 'react';
import { CarouselItem, horizontalMargin } from './CarouselItem';
import { createRef } from 'react';
import { createStyles, WithStyles, withStyles } from '@material-ui/core';
import { animated, Spring } from 'react-spring';
import { CarouselIndicator } from './CarouselIndicator';
import { ICarouselItem } from '../../../store/interfaces';
import { CarouselNavigationButton } from './CarouselNavigationButton';

const styles = () => createStyles({
    rootClass: {
        position: 'relative',
        maxWidth: 'fit-content',
        display: 'flex',
        outline: 'none',
        flexDirection: 'row',
        alignItems: 'center',
        overflow: 'hidden'
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
    items: ICarouselItem[];
    type?: 'rect' | 'circle';
    itemWidth?: number;
    selectedIndex: number;
    centered?: boolean;
    onSelectItem: (itemIndex: number) => void;
}

interface ICarouselState {
    width?: number;
    scroll: number;
}

/**
 * Generic component providing carousel functionality.
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
        this.handleItemChange(this.props.selectedIndex, true);
    }

    componentWillUnmount() {
        this.resizeObserver.disconnect();
    }

    componentDidUpdate(prevProps: Readonly<ICarouselProps>) {
        if (prevProps.selectedIndex !== this.props.selectedIndex) {
            this.handleItemChange(this.props.selectedIndex, true);
        }
    }

    handleResize = () => {
        const newWidth = this.divRef.current?.offsetWidth;
        if (newWidth !== this.state.width) {
            this.setState({
                width: newWidth
            }, () => this.handleItemChange(this.props.selectedIndex, true));
        }
    }

    getItemWidth = () => Math.min(this.props.itemWidth || 200, this.state.width! - 2 * horizontalMargin || Infinity);

    handleItemChange = (itemIndex: number, skipOnUpdate?: boolean) => {
        const itemWidth = this.getItemWidth() + 2 * horizontalMargin;
        const left = (itemIndex + 1) * itemWidth;
        if (this.props.centered) {
            this.setState({
                scroll: left + itemWidth / 2 - this.divRef.current!.offsetWidth / 2
            });
        } else {
            if (this.state.scroll! > left) {
                this.setState({
                    scroll: left
                });
            }
            const right = left + itemWidth;
            if (this.state.scroll! + this.divRef.current!.offsetWidth < right) {
                this.setState({
                    scroll: right - this.divRef.current!.offsetWidth
                });
            }
        }
        !skipOnUpdate && this.props.onSelectItem(itemIndex);
    }

    resizeObserver = new ResizeObserver(this.handleResize);

    render() {
        const classes = this.props.classes;
        const itemWidth = this.getItemWidth();
        return (
            <div
                ref={this.divRef}
                className={classes.rootClass}
                tabIndex={2}
                onKeyDown={event => {
                    if (event.key === 'ArrowLeft' && this.props.selectedIndex) {
                        this.handleItemChange(Math.max(this.props.selectedIndex - 1, 0));
                    }
                    if (event.key === 'ArrowRight' && this.props.selectedIndex < this.props.items.length - 1) {
                        this.handleItemChange(Math.min(this.props.selectedIndex + 1, this.props.items.length - 1));
                    }
                    if (event.key === 'ArrowUp' && this.props.selectedIndex) {
                        this.handleItemChange(0);
                        event.preventDefault();
                    }
                    if (event.key === 'ArrowDown' && this.props.selectedIndex < this.props.items.length - 1) {
                        this.handleItemChange(this.props.items.length - 1);
                        event.preventDefault();
                    }
                }}
            >
                {this.props.selectedIndex > 0 && (
                    <div
                        style={{
                            position: 'absolute',
                            left: 10
                        }}
                    >
                        <CarouselNavigationButton
                            type="prev"
                            onClick={() => this.handleItemChange(this.props.selectedIndex - 1)}
                        />
                    </div>
                )}
                <Spring from={{}} to={{ scroll: this.state.scroll }}>
                    {({ scroll }) => (
                        <animated.div
                            className={classes.overflowClass}
                            scrollLeft={scroll}
                        >
                            <div style={{ minWidth: itemWidth + 2 * horizontalMargin, minHeight: 1 }} />
                            {this.props.items.map((item, index) => (
                                <CarouselItem
                                    key={index}
                                    width={itemWidth}
                                    data-testid="carousel-item"
                                    item={item}
                                    type={this.props.type}
                                    onClick={() => this.handleItemChange(index)}
                                />
                            ))}
                            <div style={{ minWidth: itemWidth + 2 * horizontalMargin, minHeight: 1 }} />
                        </animated.div>
                    )}
                </Spring>
                <Spring
                    from={{}}
                    to={{
                        position: (this.props.selectedIndex + 1) * (itemWidth + 2 * horizontalMargin) // move behind items before selection
                            + itemWidth * 0.1 + horizontalMargin // move relative to selected item (
                            - (this.state.scroll || 0) // offset current scroll value
                    }}
                >
                    {({ position }) => (
                        <animated.div
                            style={{
                                position: 'absolute',
                                left: position,
                                width: itemWidth * 0.8,
                                bottom: 0
                            }}
                        >
                            <CarouselIndicator />
                        </animated.div>
                    )}
                </Spring>
                {this.props.selectedIndex < this.props.items.length - 1 && (
                    <div
                        style={{
                            position: 'absolute',
                            right: 10
                        }}
                    >
                        <CarouselNavigationButton
                            type="next"
                            onClick={() => this.handleItemChange(this.props.selectedIndex + 1)}
                        />
                    </div>
                )}
            </div>
        );
    }
}

export const Carousel = withStyles(styles)(CarouselPure);
