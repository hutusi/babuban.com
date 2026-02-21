"use client";

import { useState } from "react";
import Image, { type ImageProps } from "next/image";
import { Film } from "lucide-react";

interface PosterImageProps extends Omit<ImageProps, "onError"> {
	fallbackClassName?: string;
}

export default function PosterImage({
	fallbackClassName,
	alt,
	className,
	...props
}: PosterImageProps) {
	const [hasError, setHasError] = useState(false);

	if (hasError) {
		return (
			<div
				className={`flex items-center justify-center bg-card ${fallbackClassName || className || ""
					}`}
				style={{ position: "absolute", inset: 0 }}
				role="img"
				aria-label={alt}
			>
				<div className="flex flex-col items-center gap-2">
					<Film className="h-8 w-8 text-gold/30" />
					<span className="max-w-[80%] text-center text-[10px] leading-tight text-muted-foreground/50">
						{alt}
					</span>
				</div>
			</div>
		);
	}

	return (
		<Image
			alt={alt}
			className={className}
			onError={() => setHasError(true)}
			{...props}
		/>
	);
}
