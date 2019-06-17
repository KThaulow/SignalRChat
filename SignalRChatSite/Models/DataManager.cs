using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SignalRChartSite.Models
{
	public static class DataManager
	{
		public static List<ChartModel> GetData()
		{
			var r = new Random((int)DateTime.UtcNow.Ticks);
			return new List<ChartModel>()
			{
			   new ChartModel { Label = $"Data-{r.Next(100)}", Date = DateTime.UtcNow.AddHours(r.Next(100)), Number =  r.Next(1000)},
			   new ChartModel { Label = $"Data-{r.Next(100)}", Date = DateTime.UtcNow.AddHours(r.Next(100)), Number =  r.Next(1000) },
			   new ChartModel { Label = $"Data-{r.Next(100)}", Date = DateTime.UtcNow.AddHours(r.Next(100)), Number =  r.Next(1000) },
			   new ChartModel { Label = $"Data-{r.Next(100)}", Date = DateTime.UtcNow.AddHours(r.Next(100)), Number =  r.Next(1000) }
			};
		}
	}
}
	