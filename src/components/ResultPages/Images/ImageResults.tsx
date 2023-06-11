import type { ImageResult } from '@/utils/types';
import { api } from '@/utils/api';
import { filterOptionCell } from '@/components/Settings/Widgets/SafeSearch';

import { useCellValue } from '@/stateManager';

interface ImageResultsProps {
    query: string;
}

const ImageResults = ({ query }: ImageResultsProps) => {
  return (
    <div>ImageResults</div>
  )
}

export default ImageResults;
