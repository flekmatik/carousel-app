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
    selectedIndex: number;
    onSelectItem: (itemIndex: number) => void;
    type?: 'rect' | 'circle';
    itemWidth?: number; // width of one item, height is computed from aspect-ratio
    centered?: boolean; // keeps selected element in the center of the component
}

interface ICarouselState {
    width?: number; // width of root element
    scroll: number; // offset position of div with all elements, eg. scroll position
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
        // make sure selected element is in visible region of this component on component load
        this.setState({
            scroll: this.getPaddingWidth()
        }, () => this.handleItemChange(this.props.selectedIndex, true));
    }

    componentWillUnmount() {
        this.resizeObserver.disconnect();
    }

    componentDidUpdate(prevProps: Readonly<ICarouselProps>) {
        if (prevProps.selectedIndex !== this.props.selectedIndex) {
            // make sure selected element is in visible region of this component
            this.handleItemChange(this.props.selectedIndex, true);
        }
    }

    handleResize = () => {
        const newWidth = this.divRef.current?.offsetWidth;
        if (newWidth !== this.state.width) {
            this.setState({
                width: newWidth
            }, () => this.handleItemChange(this.props.selectedIndex, true)); // make sure selected element is in visible region of this component after resize
        }
    }

    // calculate item width (in case it was not provided in props)
    getItemWidth = () => Math.min(this.props.itemWidth || 200, this.state.width! - 2 * horizontalMargin || Infinity);
    // calculate padding on left/right side so we can scroll enough to show selected item in center
    getPaddingWidth = () => (this.divRef.current?.offsetWidth || 0) / 2;

    handleItemChange = (itemIndex: number, skipOnUpdate?: boolean) => {
        // keep focus on the component in case focused navigation button is hidden (eg. first/last item is selected)
        !skipOnUpdate && this.divRef.current?.focus();
        const itemWidth = this.getItemWidth() + 2 * horizontalMargin;
        const paddingWidth = this.getPaddingWidth();
        // calculate position of selected element on div with all elements
        const left = itemIndex * itemWidth + paddingWidth;
        if (this.props.centered) {
            this.setState({
                scroll: left + itemWidth / 2 - paddingWidth
            });
        } else {
            // make sure left edge of selected element is visible
            if (this.state.scroll! > left) {
                this.setState({
                    scroll: left
                });
            }
            const right = left + itemWidth;
            // make sure right edge of selected element is visible
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
        const selectedItem = this.props.items?.[this.props.selectedIndex];
        const paddingWidth = this.getPaddingWidth();
        return (
            <div
                ref={this.divRef}
                className={classes.rootClass}
                aria-label={(this.props as any)['aria-label'] as any}
                role="listbox"
                tabIndex={0}
                onKeyDown={event => {
                    if (event.key === 'ArrowLeft' && this.props.selectedIndex) {
                        this.handleItemChange(Math.max(this.props.selectedIndex - 1, 0));
                    }
                    if (event.key === 'ArrowRight' && this.props.selectedIndex < this.props.items.length - 1) {
                        this.handleItemChange(Math.min(this.props.selectedIndex + 1, this.props.items.length - 1));
                    }
                    if (event.key === 'ArrowUp' && this.props.selectedIndex) {
                        this.handleItemChange(0);
                        // prevent scrolling whole page in case we moved selection
                        event.preventDefault();
                    }
                    if (event.key === 'ArrowDown' && this.props.selectedIndex < this.props.items.length - 1) {
                        this.handleItemChange(this.props.items.length - 1);
                        // prevent scrolling whole page in case we moved selection
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
                            aria-hidden
                            scrollLeft={scroll}
                        >
                            <div style={{ minWidth: paddingWidth, minHeight: 1 }} />
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
                            <div style={{ minWidth: paddingWidth, minHeight: 1 }} />
                        </animated.div>
                    )}
                </Spring>
                <Spring
                    from={{}}
                    to={{
                        position: paddingWidth + this.props.selectedIndex * (itemWidth + 2 * horizontalMargin) // move behind items before selection
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
                <div
                    aria-live="assertive"
                    aria-hidden={false}
                    hidden
                >
                    {selectedItem?.alt}
                </div>
            </div>
        );
    }
}

export const Carousel = withStyles(styles)(CarouselPure);
