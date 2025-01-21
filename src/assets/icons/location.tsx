const LocationIcon = ({ color = '#2188FF' }: { color?: string }) => {
	return (
		<svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    className="w-4 h-4 flex-shrink-0 basis-auto"
    viewBox="0 0 20 20"
    fill="none"
    preserveAspectRatio="none"  
  >
    <path
      fill={color}
      fillRule="evenodd"
      d="M10.694 1.222c-4.214 0-7.638 3.056-7.638 6.722 0 5.525 7.638 12.834 7.638 12.834s7.64-7.31 7.64-12.834c0-3.666-3.425-6.722-7.64-6.722m0 17.784C8.326 16.524 4.33 11.538 4.33 7.944c0-3.03 2.864-5.5 6.365-5.5 1.706 0 3.323.587 4.533 1.663 1.171 1.05 1.833 2.407 1.833 3.837 0 3.594-3.997 8.58-6.366 11.062m2.547-11.062c0 1.357-1.133 2.445-2.547 2.445-1.413 0-2.546-1.088-2.546-2.445S9.281 5.5 10.694 5.5c1.414 0 2.547 1.088 2.547 2.444"
      clipRule="evenodd"
    ></path>
  </svg>
	)
}

export default LocationIcon