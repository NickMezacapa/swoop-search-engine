import { renderHook, act, RenderHookResult, waitFor } from '@testing-library/react';
import axiosMock from 'jest-mock-axios';
import { AxiosRequestConfig } from 'axios';
import * as sinon from 'sinon';

import useAxiosDefault, {
    useAxios,
    UseAxiosConfig,
    UseAxiosResponse,
} from '@hooks/useAxios';

/**
 * @see ../../src/hooks/useAxios.ts
 * For a detailed explanation regarding this custom hook, refer to the 
 * documentation in the file path above. 
 */

test('default exports a function', () => {
    expect(useAxios).toBeInstanceOf(Function);
    expect(useAxiosDefault).toBeInstanceOf(Function);
    expect(useAxiosDefault).toBe(useAxios);
});

describe('useAxios', () => {
    const requestConfig: AxiosRequestConfig = {
        url: '/api',
        method: 'get',
    };

    afterEach(() => {
        axiosMock.reset();
    });

    describe('without dependencies', () => {
        let hook: RenderHookResult<UseAxiosResponse<any, any>, AxiosRequestConfig<any>>;

        beforeEach(() => {
            hook = renderHook((props) => useAxios(props, []), {
                initialProps: requestConfig,
            });
        });

        it('returns initial state', () => {
            expect(hook.result.current[0]).toEqual({
                type: 'loading',
                data: true,
            });
        });

        it('executes a request', async () => {
            expect(axiosMock.request).toHaveBeenCalled();
            const { config } = axiosMock.lastReqGet();
            expect(config.url).toEqual(requestConfig.url);
            expect(config.method).toEqual(requestConfig.method);
        });

        it('executes a successful request', async () => {
            const res = { data: true };
            await act(async () => {
                axiosMock.mockResponse(res);
            });

            await waitFor(() => {
                expect(hook.result.current[0]).toEqual({
                    type: 'success',
                    data: res.data,
                });
            });
        });

        it('handles failed requests', async () => {
            const err = new Error();
            await act(async () => {
                axiosMock.mockError(err);
            });

            await waitFor(() => {
                expect(hook.result.current[0]).toEqual({
                    type: 'error',
                    data: err,
                });
            });
        });
    });

    describe('cancelation', () => {
        it('cancels a request', async () => {
            const hook = renderHook((props) => useAxios(props, []), {
                initialProps: requestConfig,
            });

            axiosMock.mockError(new axiosMock.Cancel());

            expect(hook.result.current[0]).toEqual({
                type: 'loading',
                data: true,
            });
        });

        it('cancels a request if unmounted', async () => {
            const token = new axiosMock.CancelToken(() => { });
            const cancel = sinon.spy();
            sinon.stub(axiosMock.CancelToken, 'source').returns({
                token,
                cancel,
            });

            const hook = renderHook((props) => useAxios(props, []), {
                initialProps: requestConfig,
            });

            expect(axiosMock.lastReqGet().config.cancelToken).toBe(token);

            hook.unmount();
            expect(cancel.called).toBe(true);
            ; (axiosMock.CancelToken.source as sinon.SinonSpy).restore();
        });
    });

    describe('with dependencies', () => {
        it('tracks dependencies', async () => {
            const dep1 = 'foo';
            const dep2 = 'bar';
            const hook = renderHook(({ config, deps }) => useAxios(config, deps), {
                initialProps: {
                    config: {
                        ...requestConfig,
                        params: {
                            test: dep1,
                        },
                    },
                    deps: [dep1],
                },
            });

            expect(axiosMock.lastReqGet().config.params).toEqual({
                test: dep1,
            });

            await act(async () => {
                axiosMock.mockResponse({ data: dep1 });
            });

            await waitFor(() => {
                hook.rerender({
                    config: {
                        ...requestConfig,
                        params: {
                            test: dep2,
                        },
                    },
                    deps: [dep2],
                });

                expect(hook.result.current[0]).toEqual({
                    type: 'loading',
                    data: true,
                });
                expect(axiosMock.lastReqGet().config.params).toEqual({
                    test: dep2,
                });
            });
        });
    });

    describe('with skipRequest and skipSubsequent', () => {
        it('skips initial request', async () => {
            renderHook((config: UseAxiosConfig) => useAxios(config, []), {
                initialProps: {
                    ...requestConfig,
                    skipRequest: () => true,
                    skipSubsequentRequests: () => true,
                },
            });
            expect(axiosMock.request).not.toHaveBeenCalled();
        });

        it('skips subsequent requests', async () => {
            const dep1 = 'foo';
            const dep2 = 'bar';
            const config = {
                ...requestConfig,
                skipRequest: () => true,
            };
            const hook = renderHook(({ config, deps }) => useAxios(config, deps), {
                initialProps: {
                    config,
                    deps: [dep1],
                },
            });

            expect(axiosMock.request).not.toHaveBeenCalled();

            hook.rerender({
                config,
                deps: [dep2],
            });

            expect(axiosMock.request).not.toHaveBeenCalled();
        });
    });

    describe('rerun', () => {
        it('reruns the request', async () => {
            const hook = renderHook(
                (config: UseAxiosConfig) => useAxios(config, []),
                {
                    initialProps: {
                        ...requestConfig,
                        skipRequest: () => true,
                    },
                },
            );

            expect(axiosMock.request).not.toHaveBeenCalled();

            act(() => hook.result.current[1].rerun());

            await act(async () => {
                axiosMock.mockResponse({ data: {} });
            });

            await waitFor(() => {
                expect(axiosMock.request).toHaveBeenCalled();
            });
        });
    });

    describe('type check', () => {
        it('checks', () => {
            const hook = renderHook(() => useAxios<number, string>({}, []));
            const res = hook.result.current[0];
            switch (res.type) {
                case 'success':
                    expect(res.data)
                    break;
                case 'loading':
                    expect(res.data)
                    break;
                case 'error':
                    expect(res.data)
                    break;
            }
        });
    });
});
