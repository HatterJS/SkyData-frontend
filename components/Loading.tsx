import { loadingSVG } from '@/static/svgSprite';

const Loading: React.FC = () => {
  return (
    <div className='loading'>
      {loadingSVG}
      <p>SkyData</p>
    </div>
  );
};

export default Loading;
