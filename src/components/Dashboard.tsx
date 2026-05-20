import { useState } from 'react';

type LanguageRowProps = {
  code: string;
  name: string;
  progress: number;
  strings: number;
};

type StatCardProps = {
  change: string;
  positive: boolean;
  title: string;
  value: string;
};

function LanguageRow({ name, code, strings, progress }: LanguageRowProps) {
  return (
    <tr className="border-b last:border-b-0">
      <td className="py-3 font-medium">{name}</td>
      <td className="text-muted-foreground py-3">{code}</td>
      <td className="py-3">{strings}</td>
      <td className="py-3">
        <div className="bg-muted h-2 w-full rounded-full">
          <div
            className="bg-primary h-2 rounded-full transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
      </td>
      <td className="text-muted-foreground py-3">{progress}%</td>
    </tr>
  );
}

function StatCard({ title, value, change, positive }: StatCardProps) {
  return (
    <div className="bg-card text-card-foreground rounded-lg border p-6 shadow-sm">
      <p className="text-muted-foreground text-sm">{title}</p>
      <p className="mt-2 text-3xl font-bold">{value}</p>
      <p className={`mt-1 text-sm ${positive ? 'text-green-600' : 'text-red-600'}`}>
        {positive ? '↑' : '↓'} {change} from last month
      </p>
    </div>
  );
}

const stats: StatCardProps[] = [
  { title: 'Total Strings', value: '1,284', change: '12%', positive: true },
  { title: 'Languages', value: '8', change: '2', positive: true },
  { title: 'Translated', value: '89%', change: '5%', positive: true },
  { title: 'Pending Review', value: '43', change: '8%', positive: false },
];

const languages: LanguageRowProps[] = [
  { name: 'English', code: 'en', strings: 1284, progress: 100 },
  { name: 'Spanish', code: 'es', strings: 1207, progress: 94 },
  { name: 'French', code: 'fr', strings: 1117, progress: 87 },
  { name: 'German', code: 'de', strings: 976, progress: 76 },
  { name: 'Japanese', code: 'ja', strings: 796, progress: 62 },
];

function Dashboard() {
  const [search, setSearch] = useState('');

  const filtered = languages.filter(
    (lang) =>
      lang.name.toLowerCase().includes(search.toLowerCase()) ||
      lang.code.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="bg-background min-h-screen">
      <header className="bg-card border-b px-6 py-4">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <h1 className="text-xl font-semibold">Localization Dashboard</h1>
          <div className="flex items-center gap-4">
            <input
              className="bg-background focus:border-ring rounded-md border px-3 py-2 text-sm outline-none"
              data-testid="search-input"
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search languages..."
              type="text"
              value={search}
            />
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-8">
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <StatCard key={stat.title} {...stat} />
          ))}
        </div>

        <div className="bg-card rounded-lg border shadow-sm">
          <div className="border-b px-6 py-4">
            <h2 className="text-lg font-medium">Languages</h2>
            <p className="text-muted-foreground text-sm">
              {filtered.length} of {languages.length} languages
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-muted-foreground border-b">
                  <th className="px-6 py-3 text-left text-sm font-medium">Name</th>
                  <th className="px-6 py-3 text-left text-sm font-medium">Code</th>
                  <th className="px-6 py-3 text-left text-sm font-medium">Strings</th>
                  <th className="px-6 py-3 text-left text-sm font-medium">Progress</th>
                  <th className="px-6 py-3 text-left text-sm font-medium">%</th>
                </tr>
              </thead>
              <tbody className="px-6">
                {filtered.length > 0 ? (
                  filtered.map((lang) => <LanguageRow key={lang.code} {...lang} />)
                ) : (
                  <tr>
                    <td className="text-muted-foreground py-8 text-center" colSpan={5}>
                      No languages found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
