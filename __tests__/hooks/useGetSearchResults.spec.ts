import { renderHook, act, RenderHookResult, waitFor } from '@testing-library/react';
import axiosMock from 'jest-mock-axios';
import { AxiosRequestConfig } from 'axios';
import * as sinon from 'sinon';

import { useGetSearchResults } from '@hooks/useGetSearchResults';

