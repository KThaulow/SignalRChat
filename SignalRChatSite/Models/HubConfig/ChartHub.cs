using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using SignalRChatSite.Models.HubConfig;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SignalRChartSite.Models.HubConfig
{
	[Authorize]
	public class ChatHub : Hub
	{
		private readonly static ConnectionMapping<string> _connections = new ConnectionMapping<string>();

		public Task SendToAll(string message)
		{
			return Clients.All.SendAsync("SendMessage", message);
		}

		public Task SendMessageToCaller(string message)
		{
			return Clients.Caller.SendAsync("SendMessage", message);
		}

		public Task SendMessageToUser(string connectionId, string message)
		{
			return Clients.Client(connectionId).SendAsync("SendMessage", message);
		}

		public async void SendChatMessage(string receiver, string message)
		{
			string name = Context.User.Identity.Name;

			foreach (var connectionId in _connections.GetConnections(receiver))
			{
				await Clients.Client(connectionId).SendAsync(name + ": " + message);
			}
		}

		public override Task OnConnectedAsync()
		{
			string name = Context.User.Identity.Name;

			_connections.Add(name, Context.ConnectionId);

			return base.OnConnectedAsync();
		}


		public override Task OnDisconnectedAsync(Exception exception)
		{
			string name = Context.User.Identity.Name;

			_connections.Remove(name, Context.ConnectionId);

			return base.OnDisconnectedAsync(exception);
		}
	}
}
