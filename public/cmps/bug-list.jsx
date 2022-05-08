import { BugPreview } from "./bug-preview.jsx"

export function BugList({ user, bugs, onEditBug, onRemoveBug }) {

    return <table className="bug-list">
        <tbody>
            <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Severity</th>
                <th>Created At</th>
                <th>Username</th>
                <th>Actions</th>
            </tr>
            {bugs.map((bug, idx) => <BugPreview key={idx} user={user} onRemoveBug={onRemoveBug} onEditBug={onEditBug} bug={bug} />)}
        </tbody>
    </table>
}
