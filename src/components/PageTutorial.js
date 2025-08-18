import React, { useState, useEffect } from 'react';

const PageTutorial = ({ isOpen, onClose, title = 'Page Tutorial', steps = [], darkMode = false }) => {
	const [index, setIndex] = useState(0);
	const [position, setPosition] = useState({ top: 40, left: 40 });
	const [dragging, setDragging] = useState(false);
	const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

	useEffect(() => {
		if (isOpen) setIndex(0);
	}, [isOpen]);

	useEffect(() => {
		const handleMouseMove = (e) => {
			if (!dragging) return;
			setPosition((prev) => {
				const panelWidth = 560; // approx max-w-2xl
				const panelHeight = 200; // min height estimate
				const nextLeft = Math.max(8, Math.min(window.innerWidth - 8 - panelWidth, e.clientX - dragOffset.x));
				const nextTop = Math.max(8, Math.min(window.innerHeight - 8 - panelHeight, e.clientY - dragOffset.y));
				return { top: nextTop, left: nextLeft };
			});
		};
		const handleMouseUp = () => setDragging(false);
		if (dragging) {
			document.addEventListener('mousemove', handleMouseMove);
			document.addEventListener('mouseup', handleMouseUp);
		}
		return () => {
			document.removeEventListener('mousemove', handleMouseMove);
			document.removeEventListener('mouseup', handleMouseUp);
		};
	}, [dragging, dragOffset.x, dragOffset.y]);

	if (!isOpen) return null;

	const isFirst = index === 0;
	const isLast = index === steps.length - 1;

	const goPrev = () => {
		if (!isFirst) setIndex(index - 1);
	};

	const goNext = () => {
		if (!isLast) setIndex(index + 1);
		else onClose();
	};

	const startDrag = (e) => {
		const rect = e.currentTarget.parentElement.getBoundingClientRect();
		setDragging(true);
		setDragOffset({ x: e.clientX - rect.left, y: e.clientY - rect.top });
	};

	return (
		<div className="fixed inset-0 z-50 pointer-events-none" role="dialog" aria-modal="false" aria-label={title}>
			<div
				className={`pointer-events-auto max-w-2xl w-[min(90vw,640px)] rounded-lg shadow-xl border ${darkMode ? 'bg-gray-900 border-gray-700 text-gray-100' : 'bg-white border-gray-200 text-gray-900'}`}
				style={{ position: 'fixed', top: position.top, left: position.left }}
			>
				<div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800 cursor-move select-none" onMouseDown={startDrag}>
					<h2 className="text-lg font-semibold truncate pr-2">{title}</h2>
					<button
						className={`px-2 py-1 rounded ${darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}
						onClick={onClose}
						aria-label="Close tutorial"
					>
						✕
					</button>
				</div>
				<div className="p-4">
					<div className="flex items-center justify-between mb-3">
						<div className="text-sm opacity-70">Step {index + 1} of {steps.length}</div>
						<div className="flex gap-1">
							{steps.map((_, i) => (
								<span key={i} className={`inline-block w-2 h-2 rounded-full ${i === index ? 'bg-blue-500' : (darkMode ? 'bg-gray-700' : 'bg-gray-300')}`}></span>
							))}
						</div>
					</div>
					<div className="space-y-2">
						{Array.isArray(steps[index]) ? (
							<ul className="list-disc pl-5 space-y-1">
								{steps[index].map((line, li) => (
									<li key={li}>{line}</li>
								))}
							</ul>
						) : (
							<p className="leading-relaxed whitespace-pre-line">{steps[index]}</p>
						)}
					</div>
				</div>
				<div className="flex items-center justify-between p-4 border-t border-gray-200 dark:border-gray-800">
					<button
						className={`px-3 py-2 rounded text-sm ${isFirst ? 'opacity-50 cursor-not-allowed' : ''} ${darkMode ? 'bg-gray-800 text-gray-200 hover:bg-gray-700' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}
						onClick={goPrev}
						disabled={isFirst}
					>
						Previous
					</button>
					<div className="flex gap-2">
						<button
							className={`px-3 py-2 rounded text-sm ${darkMode ? 'bg-gray-800 text-gray-200 hover:bg-gray-700' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}
							onClick={onClose}
						>
							Skip
						</button>
						<button
							className="px-4 py-2 rounded text-sm bg-blue-600 text-white hover:bg-blue-700"
							onClick={goNext}
						>
							{isLast ? 'Finish' : 'Next'}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PageTutorial;


