import { bubbleSortAlgo } from '@/app/algorithm/bubbleSort';
import { MERGE_SORT_SVG_HEIGHT, MERGE_SORT_SVG_WIDTH } from '@/app/constant';
import { bubbleSortColorsData } from '@/app/data/mockData';
import { sortingData } from '@/app/data/SortData';
import { clearAllTimeouts, Sleep } from '@/app/lib/sleepMethod';
import { SortingDataProps } from '@/app/types/sortingProps';
import StatusColorsPlate from '@/app/utils/StatusColorsPlate';
import React, { useEffect, useState } from 'react';

// Calculate the maximum value to normalize data
const maxValue = Math.max(...sortingData.map((item) => Number(item.data)));

// Calculate column width and spacing
const columnWidth = MERGE_SORT_SVG_WIDTH / sortingData.length;
const columnSpacing = 5; // Space between columns

const BubbleSortComponent: React.FC<{ speedRange: number }> = ({ speedRange }) => {
  /** Define component state */
  const [data, setData] = useState<SortingDataProps[]>(JSON.parse(JSON.stringify(sortingData)));
  const [step, setStep] = useState<number>(0);

  useEffect(() => {
    if (data.length) {
      bubbleSortMethod();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /** a method to mark state as a initial-state */
  const resetDataState = async () => {
    // reset time-out
    clearAllTimeouts();

    const tempData = data.map((item) => ({
      ...item,
      isSorted: false,
      isSwapped: false,
      currentItem: false,
      isFinished: false,
    }));

    setData(tempData);
  };

  const bubbleSortMethod = async () => {
    try {
      if (!data.length) {
        throw new Error('The array is undefined!');
      }

      // Clear all state before starting
      await resetDataState();

      // Wait for state update to complete
      await Sleep(100);

      // Call the bubble sort algorithm
      bubbleSortAlgo(data, setData, speedRange, setStep);
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.error(error);
      }
    }
  };

  return (
    <div>
      <div className='mb-3 mt-3 sm:mt-0'>
        <StatusColorsPlate data={bubbleSortColorsData} />
      </div>
      <div className='flex items-end justify-center'>
        <svg viewBox={`0 0 ${MERGE_SORT_SVG_WIDTH} ${MERGE_SORT_SVG_HEIGHT}`} className='border'>
          {data.map((item, index) => {
            const x = index * columnWidth;
            const columnHeight = (Number(item.data) / maxValue) * MERGE_SORT_SVG_HEIGHT + 15;

            let fillColor = 'black';

            if (item.isSwapped) {
              fillColor = 'red';
            }

            if (item.isSorted) {
              fillColor = 'green';
            }

            return (
              <g key={item.id}>
                <rect
                  x={x}
                  y={MERGE_SORT_SVG_HEIGHT - columnHeight}
                  width={columnWidth - columnSpacing}
                  height={columnHeight}
                  fill={fillColor}
                />
              </g>
            );
          })}
        </svg>
      </div>
      <div className='item-center flex flex-wrap p-0 pt-3 text-center'>
        {data?.length &&
          data.map((item) => {
            let fillColor = 'bg-white';

            if (item.isSwapped) {
              fillColor = 'bg-red-600 text-white';
            }

            if (item.isSorted) {
              fillColor = 'bg-green-600 text-white';
            }
            return (
              <p key={item.id} className={`min-w-[50px] border p-2 text-[12px] ${fillColor}`}>
                {item.data || ''}
              </p>
            );
          })}
      </div>
      <div className='mt-4 text-center'>
        <p>Step: {step}</p>
      </div>
    </div>
  );
};

export default BubbleSortComponent;
