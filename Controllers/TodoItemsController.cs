using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DotnetReact.Data;
using DotnetReact.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using System.Diagnostics;

namespace DotnetReact.Controllers;
    [Route("[controller]")]
    [ApiController]
    public class TodoItemsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        protected UserManager<ApplicationUser> UserManager { get; }

        public TodoItemsController(ApplicationDbContext context, UserManager<ApplicationUser> userManager)
        {
            _context = context;
            UserManager = userManager;

        }

        // GET: TodoItems/5
        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<TodoItem>>> GetTodoItem(string id)
        {
            var contacts = (from c in _context.TodoItem
            select c);
            var List = contacts.Where(c => c.OwnerID == id);

          if (_context.TodoItem == null)
          {
              return NotFound();
          }
          
          if (List == null)
          {
            return CreatedAtAction("GetTodoItem", "No todos found");

          }
            
            return await List.ToListAsync();

        }

        // PUT: api/TodoItems/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTodoItem(long id, TodoItem todoItem)
        {
            if (id != todoItem.Id)
            {
                return BadRequest();
            }

            _context.Entry(todoItem).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TodoItemExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: TodoItems
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<TodoItem>> PostTodoItem(TodoItem todoItem)
        {
          if (_context.TodoItem == null)
          {
              return Problem("Entity set 'MyDbContext.TodoItem'  is null.");
          }
            var currentUserId = UserManager.GetUserId(User);
            _context.TodoItem.Add(todoItem);
            await _context.SaveChangesAsync();
            Console.WriteLine( "current user", User );
            return CreatedAtAction("GetTodoItem", new { id = todoItem.Id }, todoItem);
        }

        // DELETE: api/TodoItems/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTodoItem(long id)
        {
            if (_context.TodoItem == null)
            {
                return NotFound();
            }
            var todoItem = await _context.TodoItem.FindAsync(id);
            if (todoItem == null)
            {
                return NotFound();
            }

            _context.TodoItem.Remove(todoItem);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool TodoItemExists(long id)
        {
            return (_context.TodoItem?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
