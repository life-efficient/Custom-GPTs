import playbooks from './playbooks'

const page = props => {
    return (
        // page containing links to all playbooks
        <div>
            {playbooks.map(playbook => (
                <LinkCard title={playbook.title} description={playbook.description} link={playbook.link} />
            ))}
        </div>

    )
}

export default page