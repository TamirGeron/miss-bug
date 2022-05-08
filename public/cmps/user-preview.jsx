

export function UserPreview({ user, onRemoveUser }) {
    return <tr className="bug-preview">
        <td>{user.username}</td>
        <td>{user._id}</td>
        <td>
            <button onClick={() => onRemoveUser(user._id)}>Delete</button>
        </td>
    </tr>
}
