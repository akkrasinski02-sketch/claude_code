import React from 'react';
import {Composition} from 'remotion';
import {MyComp} from './MyComp';

export const Root: React.FC = () => {
	return (
		<>
			<Composition
				id="MyComp"
				component={MyComp}
				durationInFrames={240}
				width={1920}
				height={1080}
				fps={30}
				defaultProps={{
					title: 'Hello from Remotion',
					subtitle: 'Videos made with React',
				}}
			/>
		</>
	);
};
