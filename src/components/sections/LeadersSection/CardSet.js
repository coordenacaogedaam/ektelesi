import PersonCard from '../../common/Cards/PersonCard'

export default function CardSet({ leaders }) {
  return (
    <div className="flex flex-wrap justify-center">
      {leaders.map(properties => (
        <PersonCard key={properties.name} {...properties} />
      ))}
    </div>
  )
}
