export default function Loading() {
	return (
		<div className="flex min-h-[60vh] items-center justify-center">
			<div className="flex flex-col items-center gap-4">
				<div className="h-10 w-10 animate-spin rounded-full border-2 border-gold/20 border-t-gold" />
				<p className="animate-pulse text-sm text-muted-foreground">
					Loading...
				</p>
			</div>
		</div>
	);
}
