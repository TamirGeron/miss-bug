

export function BugPreview({ user, bug, onRemoveBug, onEditBug }) {
    if (!user) user = {
        _id: '',
        isAdmin: 'false'
    }
    return <tr className="bug-preview">
        <td>{bug.title}</td>
        <td>{bug.description}</td>
        <td>{bug.severity}</td>
        <td>{bug.createdAt}</td>
        <td>{bug.creator.username}</td>
        {(user._id === bug.creator._id || user.isAdmin === 'true') && <td>
            <button onClick={() => onRemoveBug(bug._id)}>Delete</button>
            <button onClick={() => onEditBug(bug)}>Update</button>
        </td>}
    </tr>
}
