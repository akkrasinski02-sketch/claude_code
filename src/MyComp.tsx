import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	random,
	Sequence,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';
import {
	linearTiming,
	springTiming,
	TransitionSeries,
} from '@remotion/transitions';
import {fade} from '@remotion/transitions/fade';
import {slide} from '@remotion/transitions/slide';

export type MyCompProps = {
	title: string;
	subtitle: string;
};

export const MyComp: React.FC<MyCompProps> = ({title, subtitle}) => {
	return (
		<AbsoluteFill style={{backgroundColor: '#0b1020'}}>
			<Stars />
			<TransitionSeries>
				<TransitionSeries.Sequence durationInFrames={90}>
					<TitleScene title={title} subtitle={subtitle} />
				</TransitionSeries.Sequence>
				<TransitionSeries.Transition
					timing={springTiming({config: {damping: 200}, durationInFrames: 20})}
					presentation={fade()}
				/>
				<TransitionSeries.Sequence durationInFrames={90}>
					<ShapesScene />
				</TransitionSeries.Sequence>
				<TransitionSeries.Transition
					timing={linearTiming({durationInFrames: 20})}
					presentation={slide()}
				/>
				<TransitionSeries.Sequence durationInFrames={80}>
					<FinaleScene />
				</TransitionSeries.Sequence>
			</TransitionSeries>
		</AbsoluteFill>
	);
};

const Stars: React.FC = () => {
	const frame = useCurrentFrame();
	const {width, height} = useVideoConfig();

	const stars = new Array(80).fill(0).map((_, i) => {
		const x = random(`x-${i}`) * width;
		const y = random(`y-${i}`) * height;
		const size = random(`s-${i}`) * 3 + 1;
		const twinkle = interpolate(
			Math.sin((frame + i * 7) / 10),
			[-1, 1],
			[0.2, 1],
		);
		return (
			<div
				key={i}
				style={{
					position: 'absolute',
					left: x,
					top: y,
					width: size,
					height: size,
					borderRadius: '50%',
					background: 'white',
					opacity: twinkle,
				}}
			/>
		);
	});

	return <AbsoluteFill>{stars}</AbsoluteFill>;
};

const TitleScene: React.FC<{title: string; subtitle: string}> = ({
	title,
	subtitle,
}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();

	const titleScale = spring({
		fps,
		frame,
		config: {damping: 12, stiffness: 120, mass: 0.6},
	});

	const subtitleOpacity = interpolate(frame, [25, 45], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	const subtitleY = interpolate(frame, [25, 45], [20, 0], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	return (
		<AbsoluteFill
			style={{
				justifyContent: 'center',
				alignItems: 'center',
				fontFamily:
					'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
				color: 'white',
			}}
		>
			<div
				style={{
					transform: `scale(${titleScale})`,
					fontSize: 140,
					fontWeight: 800,
					letterSpacing: -2,
					background:
						'linear-gradient(90deg, #7dd3fc 0%, #a78bfa 50%, #f472b6 100%)',
					WebkitBackgroundClip: 'text',
					WebkitTextFillColor: 'transparent',
					textAlign: 'center',
				}}
			>
				{title}
			</div>
			<div
				style={{
					marginTop: 24,
					fontSize: 44,
					opacity: subtitleOpacity,
					transform: `translateY(${subtitleY}px)`,
					color: '#cbd5e1',
					letterSpacing: 2,
				}}
			>
				{subtitle}
			</div>
		</AbsoluteFill>
	);
};

const ShapesScene: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps, width, height} = useVideoConfig();

	const colors = ['#38bdf8', '#a78bfa', '#f472b6', '#facc15', '#4ade80'];

	return (
		<AbsoluteFill
			style={{justifyContent: 'center', alignItems: 'center', gap: 60}}
		>
			<div
				style={{
					fontSize: 64,
					color: 'white',
					fontFamily: 'system-ui, sans-serif',
					fontWeight: 700,
					marginBottom: 40,
				}}
			>
				Driven by frames
			</div>
			<div style={{display: 'flex', gap: 40}}>
				{colors.map((color, i) => {
					const delay = i * 6;
					const s = spring({
						fps,
						frame: frame - delay,
						config: {damping: 10, stiffness: 100},
					});
					const rotation = interpolate(frame, [0, 90], [0, 360]);
					return (
						<div
							key={color}
							style={{
								width: 160,
								height: 160,
								background: color,
								borderRadius: 24,
								transform: `scale(${s}) rotate(${rotation + i * 30}deg)`,
								boxShadow: `0 10px 40px ${color}55`,
							}}
						/>
					);
				})}
			</div>
			<Sequence from={30}>
				<ProgressBar />
			</Sequence>
		</AbsoluteFill>
	);
};

const ProgressBar: React.FC = () => {
	const frame = useCurrentFrame();
	const progress = interpolate(frame, [0, 50], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	return (
		<div
			style={{
				marginTop: 60,
				width: 900,
				height: 18,
				background: 'rgba(255,255,255,0.1)',
				borderRadius: 999,
				overflow: 'hidden',
			}}
		>
			<div
				style={{
					width: `${progress * 100}%`,
					height: '100%',
					background:
						'linear-gradient(90deg, #7dd3fc 0%, #a78bfa 50%, #f472b6 100%)',
				}}
			/>
		</div>
	);
};

const FinaleScene: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();

	const scale = spring({
		fps,
		frame,
		config: {damping: 14, stiffness: 90},
	});

	const pulse = interpolate(
		Math.sin(frame / 8),
		[-1, 1],
		[0.92, 1.08],
	);

	return (
		<AbsoluteFill
			style={{
				justifyContent: 'center',
				alignItems: 'center',
				color: 'white',
				fontFamily: 'system-ui, sans-serif',
			}}
		>
			<div
				style={{
					transform: `scale(${scale * pulse})`,
					fontSize: 180,
					fontWeight: 900,
					background:
						'linear-gradient(90deg, #f472b6 0%, #facc15 100%)',
					WebkitBackgroundClip: 'text',
					WebkitTextFillColor: 'transparent',
				}}
			>
				Thanks!
			</div>
			<div
				style={{
					marginTop: 20,
					fontSize: 36,
					opacity: interpolate(frame, [10, 30], [0, 1], {
						extrapolateLeft: 'clamp',
						extrapolateRight: 'clamp',
					}),
					color: '#cbd5e1',
				}}
			>
				Made with Remotion + React
			</div>
		</AbsoluteFill>
	);
};
