import React from 'react';
import { Carousel } from './Carousel';
import { mockResizeObserver } from '../../../utils-tests';
import { render, screen } from '@testing-library/react';

mockResizeObserver();

it('renders', () => {
    render((
        <Carousel
            items={[]}
            onSelectItem={() => {}}
            selectedIndex={0}
        />
    ));
});

it('selects next page on click', () => {
    const changeMock = jest.fn();
    render((
        <Carousel
            items={[
                {
                    title: 'some title',
                    imageUrl: 'some'
                },
                {
                    title: 'next title',
                    imageUrl: 'next'
                }
            ]}
            onSelectItem={changeMock}
            selectedIndex={0}
        />
    ));
    const nextButton = screen.getByTestId('carousel-next-button');
    expect(nextButton).toBeInTheDocument();
    nextButton.click();
    expect(changeMock.mock.calls[0][0]).toBe(1);
});

it('hides next page button on last page', () => {
    const changeMock = jest.fn();
    render((
        <Carousel
            items={[
                {
                    title: 'some title',
                    imageUrl: 'some'
                },
                {
                    title: 'next title',
                    imageUrl: 'next'
                }
            ]}
            onSelectItem={changeMock}
            selectedIndex={1}
        />
    ));
    const nextButton = screen.queryByTestId('carousel-next-button');
    expect(nextButton).not.toBeInTheDocument();
});
