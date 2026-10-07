import { groupBy } from '@/lib/format';

// Skills grouped by category, each with a level bar.
export default function SkillsGrid({ skills }) {
  const groups = Object.entries(groupBy(skills, 'category'));

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {groups.map(([category, items]) => (
        <div key={category} className="card p-6">
          <h3 className="font-semibold">{category}</h3>
          <ul className="mt-4 space-y-4">
            {items.map((skill) => (
              <li key={skill._id}>
                <div className="flex justify-between text-sm">
                  <span>{skill.name}</span>
                  <span className="text-muted tabular-nums">{skill.level}%</span>
                </div>
                <div
                  className="bg-line mt-1.5 h-1.5 overflow-hidden rounded-full"
                  role="progressbar"
                  aria-label={skill.name}
                  aria-valuenow={skill.level}
                  aria-valuemin={0}
                  aria-valuemax={100}
                >
                  <div className="bg-accent h-full rounded-full" style={{ width: `${skill.level}%` }} />
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
