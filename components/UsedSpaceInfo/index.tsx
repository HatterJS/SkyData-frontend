import styles from './UsedSpaceInfo.module.scss';

import { User } from '@/api/dto/auth.dto';

interface UsedSpaceProps {
  userData: User;
}

const UsedSpaceInfo: React.FC<UsedSpaceProps> = ({ userData }) => {
  const totalSpace: number = userData.maxSize * 10 ** 7; // 7 змінити на 9 <----------------
  const calculatePercentage = (usedSpace: number, totalSpace: number) => {
    return (usedSpace / totalSpace) * 100;
  };
  const totalPercentage = calculatePercentage(
    userData.usedSpace.images + userData.usedSpace.documents,
    totalSpace
  );
  const imagePercentage = calculatePercentage(
    userData.usedSpace.images,
    totalSpace
  );
  const documentPercentage = calculatePercentage(
    userData.usedSpace.documents,
    totalSpace
  );
  //for chart
  const circleLength = (r: number) => {
    return 2 * Math.PI * r;
  };
  const r1 = 100;
  const r2 = 80;
  const r3 = 60;
  const rotate1 = 0;
  const rotate2 = 90;
  const rotate3 = 180;
  const strokeWidth = 10;
  const l1 = (circleLength(r3) * totalPercentage) / 100;
  const l2 = (circleLength(r2) * imagePercentage) / 100;
  const l3 = (circleLength(r1) * documentPercentage) / 100;
  return (
    <div className={styles.spaceUsed}>
      <div className={styles.chartBlock}>
        <div className={styles.chart}>
          <svg
            width={(r1 + strokeWidth) * 2}
            height={(r1 + strokeWidth) * 2}
            // viewBox={`0, 0, ${(r1 + strokeWidth) * 2}, ${(r1 + strokeWidth) * 2}`}
            fill='none'
          >
            <circle
              cx={r1 + strokeWidth}
              cy={r1 + strokeWidth}
              r={r1}
              stroke='#555555'
            />
            <circle
              cx={r1 + strokeWidth}
              cy={r1 + strokeWidth}
              r={r1}
              stroke='#0C99D1'
              strokeWidth={strokeWidth}
              transform={`rotate(${rotate1} ${r1 + strokeWidth} ${
                r1 + strokeWidth
              })`}
              strokeDashoffset='0'
              strokeDasharray={`${l3}, 1000`}
            />
            <circle
              cx={r1 + strokeWidth}
              cy={r1 + strokeWidth}
              r={r2}
              stroke='#555555'
            />
            <circle
              cx={r1 + strokeWidth}
              cy={r1 + strokeWidth}
              r={r2}
              stroke='#FFEB37'
              strokeWidth={strokeWidth}
              transform={`rotate(${rotate2} ${r1 + strokeWidth} ${
                r1 + strokeWidth
              })`}
              strokeDashoffset='0'
              strokeDasharray={`${l2}, 1000`}
            />
            <circle
              cx={r1 + strokeWidth}
              cy={r1 + strokeWidth}
              r={r3}
              stroke='#555555'
            />
            <circle
              cx={r1 + strokeWidth}
              cy={r1 + strokeWidth}
              r={r3}
              stroke='#AAAAAA'
              strokeWidth={strokeWidth}
              transform={`rotate(${rotate3} ${r1 + strokeWidth} ${
                r1 + strokeWidth
              })`}
              strokeDashoffset='0'
              strokeDasharray={`${l1}, 1000`}
            />
          </svg>
          <div className={styles.chartPercentage}>
            {totalPercentage.toFixed(2)}%
          </div>
        </div>
        <div className={styles.chartInformation}>
          <ul>
            <li>
              <div></div> <b>Зображення:</b> {imagePercentage.toFixed(2)}% (
              {(userData.usedSpace.images / 10 ** 6).toFixed(2)} Мб)
            </li>
            <li>
              <div></div> <b>Документи:</b> {documentPercentage.toFixed(2)}% (
              {(userData.usedSpace.documents / 10 ** 6).toFixed(2)} Мб)
            </li>
            <li>
              <div></div> <b>Загалом:</b> {totalPercentage.toFixed(2)}% (
              {(
                (userData.usedSpace.images + userData.usedSpace.documents) /
                10 ** 6
              ).toFixed(2)}{' '}
              Мб)
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UsedSpaceInfo;
