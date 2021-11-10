import React from 'react';
import { render, screen } from '@testing-library/react';
import { CarouselPage } from './CarouselPage';
import { mockResizeObserver } from '../../utils-tests';

mockResizeObserver();

test('renders', () => {
    render((
        <CarouselPage
            page={{
                imageUrl: 'nonsense'
            }}
            width={50}
        />
    ));
});

test('calls click when clicked', () => {
    const mockCallback = jest.fn();
    render((
        <CarouselPage
            page={{
                imageUrl: 'nonsense',
                alt: 'test alt text'
            }}
            width={50}
            onClick={mockCallback}
        />
    ));
    const storiesElement = screen.getByAltText('test alt text');
    expect(mockCallback.mock.calls.length).toBe(0);
    storiesElement.click();
    expect(mockCallback.mock.calls.length).toBe(1);
});
