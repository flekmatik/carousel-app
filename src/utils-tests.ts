
class ResizeObserverMock {
    disconnect = () => {
    }
    observe = () => {
    }
}

export const mockResizeObserver = () => {
    global.ResizeObserver = ResizeObserverMock as any;
}

