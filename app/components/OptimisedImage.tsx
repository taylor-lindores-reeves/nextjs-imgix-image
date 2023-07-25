"use client";
import Image from "next/image";

type OptimisedImageProps = {
	src?: string;
	alt: string;
};

type imgixLoaderProps = {
	src: string;
	width: number;
	quality?: number;
};

const imgixLoader = ({ src, width }: imgixLoaderProps) => {
	const url = new URL(src);

	const imageName = url.pathname.split("/").pop();

	const imgixUrl = new URL(""); // insert imgix URL here

	imgixUrl.pathname = `/${imageName}`;

	imgixUrl.searchParams.set("auto", "format,compress");
	imgixUrl.searchParams.set("w", width.toString());
	imgixUrl.searchParams.set("q", "75");

	return imgixUrl.href;
};

export default function OptimisedImage(props: OptimisedImageProps) {
	const {
		src = "", // insert S3 bucket URL here
		alt
	} = props;

	return (
		<Image
			style={{ objectFit: "contain" }}
			loader={imgixLoader}
			width={400}
			height={150}
			src={src}
			alt={alt}
		/>
	);
}
