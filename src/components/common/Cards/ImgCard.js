const Dent = () => (
  <svg
    preserveAspectRatio="none"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 583 95"
    className="absolute left-0 w-full block"
    style={{
      height: '95px',
      top: '-94px'
    }}
  >
    <polygon points="-30,95 583,95 583,65" className="text-primary fill-current" />
  </svg>
)

export default function ImgCard({ src, alt, title, details, tailwindClass, dent }) {
  return (
    <div className="w-full md:w-4/12 px-4 mr-auto ml-auto">
      <div
        className={`${tailwindClass} relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg`}
      >
        <img alt={alt} src={src} className="w-full align-middle rounded-t-lg" />
        <blockquote className="relative p-8 mb-4">
          {dent && <Dent />}
          <h4>{title}</h4>
          <p className="mt-2">{details}</p>
        </blockquote>
      </div>
    </div>
  )
}
