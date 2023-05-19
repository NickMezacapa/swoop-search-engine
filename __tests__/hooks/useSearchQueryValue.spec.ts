import { renderHook, act } from '@testing-library/react';
import { useSearchQueryValue } from '@hooks/useSearchQueryValue';

/**
 * @see ../../src/hooks/useSearchQueryValue.ts
 * For a detailed explanation regarding this custom hook, refer to the 
 * documentation in the file path above. 
 */

describe('useSearchQueryValue', () => {
    it('initializes a value state to the provided input value', () => {
        const initialValue: string = 'foo';
        const { result } = renderHook(() => useSearchQueryValue(initialValue));

        expect(result.current.value).toBe(initialValue);
    });

    it('updates the value when setValue is called', () => {
        const initialValue: string = 'foo';
        const { result } = renderHook(() => useSearchQueryValue(initialValue));

        act(() => {
            result.current.setValue('foobar');
        });

        expect(result.current.value).toBe('foobar');
    });

    it('resets the value to empty string when reset is called', () => {
        const initialValue: string = 'foo';
        const { result } = renderHook(() => useSearchQueryValue(initialValue));

        act(() => {
            result.current.reset();
        });

        expect(result.current.value).toBe('');
    });

    it('updates the value state when the input value changes', () => {
        const initialValue: string = 'foo';
        const { result } = renderHook(() => useSearchQueryValue(initialValue));

        act(() => {
            result.current.bind.onChange({
                target: { value: 'foobar' }
            } as React.ChangeEvent<HTMLInputElement>);
        });

        expect(result.current.value).toBe('foobar');
    });

    it('binds the input value and onChange event', () => {
        const initialValue: string = 'foo';
        const { result } = renderHook(() => useSearchQueryValue(initialValue));

        expect(result.current.bind.value).toBe(result.current.value);

        act(() => {
            result.current.bind.onChange({
                target: { value: 'foobar' }
            } as React.ChangeEvent<HTMLInputElement>);
        });

        expect(result.current.value).toBe('foobar');
    });
});
