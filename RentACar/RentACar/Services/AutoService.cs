using RentACar.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace RentACar.Services;

public class AutoService
{
    private readonly IMongoCollection<Auto> _autoCollection;

    public AutoService(IOptions<DatabaseSettings> DatabaseSettings)
    {
        var mongoClient = new MongoClient(DatabaseSettings.Value.ConnectionString);
        var mongoDatabase = mongoClient.GetDatabase(DatabaseSettings.Value.DatabaseName);

        _autoCollection = mongoDatabase.GetCollection<Auto>(
            DatabaseSettings.Value.AutomobiliCollectionName);
    }

    public IMongoCollection<Auto> Collection { get { return _autoCollection; } }

    public async Task<List<Auto>> GetAsync() =>
       await _autoCollection.Find(_ => true).ToListAsync();

    public async Task<Auto> GetAsync(string id) =>
        await _autoCollection.Find(x => x.Id == id).FirstOrDefaultAsync();

    public async Task CreateAsync(Auto noviAuto) =>
        await _autoCollection.InsertOneAsync(noviAuto);

    public async Task UpdateAsync(string id, Auto updatedAuto) =>
        await _autoCollection.ReplaceOneAsync(x => x.Id == id, updatedAuto);

    public async Task RemoveAsync(string id) =>
        await _autoCollection.DeleteOneAsync(x => x.Id == id);

}
